import core, { API, FileInfo, Options } from 'jscodeshift';
import { NodePath } from 'ast-types/lib/node-path';
import {
  hasImportDeclaration,
  getJSXAttributes,
  getDefaultImportSpecifierName,
  getImportSpecifierName,
} from '@codeshift/utils';

function addCommentBeforeJSX(
  j: core.JSCodeshift,
  element: NodePath,
  message: string,
) {
  function clean(value: string) {
    return value
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/^[ \t]*/gm, '')
      .trim();
  }

  const content = `\nTODO: (@codeshift) ${clean(message)}\n`;
  const comment = j.commentBlock(content, false, true);

  element.insertBefore(comment);
}

function updateCssFnProp(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  specifier: string,
) {
  source.findJSXElements(specifier).forEach(element => {
    const cssFnPropCollection = getJSXAttributes(j, element, 'cssFn');

    // no cssProp usage for this element
    if (!cssFnPropCollection.length) return;

    const cssFnProp = cssFnPropCollection.get();

    const cssFnExpression = cssFnPropCollection
      .find(j.JSXExpressionContainer)
      .find(j.Expression)
      .get();

    if (cssFnExpression) {
      // just remove the state styles param
      try {
        const [stylePropName] = cssFnExpression!.value.params;
        j(cssFnExpression)
          .find(j.SpreadElement)
          .forEach(n => {
            // discerns whether there are multiple identifiers here
            const isComplexIdentifier = j(n).find(j.Identifier).length > 1;

            if (isComplexIdentifier) {
              throw new Error(
                'CSSFn Prop codemod: Unable to parse spread element',
              );
            }

            const hasStyleProp = !!j(n)
              .find(j.Identifier)
              .filter(node => node.value.name === stylePropName.name).length;
            if (hasStyleProp) {
              j(n).remove();
            }
          });

        cssFnExpression!.value.params.shift();
      } catch (e) {
        addCommentBeforeJSX(
          j,
          cssFnProp,
          `
        The usage of the 'cssFn' prop in this component could not be transformed and requires manual intervention.
        The 'cssFn' prop has been simplified so that users no longer need to merge the inherited styles with their own overrides.
        For more info please reach out to #help-design-system-code.
        `,
        );
      }
    }
  });
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, '@atlaskit/menu')) {
    return fileInfo.source;
  }

  const defaultSpecifier = getDefaultImportSpecifierName(
    j,
    source,
    '@atlaskit/menu',
  );

  if (defaultSpecifier != null) {
    updateCssFnProp(j, source, defaultSpecifier);
  }

  [
    'ButtonItem',
    'LinkItem',
    'CustomItem',
    'HeadingItem',
    'SkeletonItem',
    'SkeletonHeadingItem',
    'MenuGroup',
    'PopupMenuGroup',
    'Section',
  ].forEach(pkg => {
    const importSpecifier = getImportSpecifierName(
      j,
      source,
      pkg,
      '@atlaskit/menu',
    );

    if (importSpecifier != null) {
      updateCssFnProp(j, source, importSpecifier);
    }
  });

  return source.toSource(options.printOptions);
}
