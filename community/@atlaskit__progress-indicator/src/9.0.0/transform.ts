import core, { API, FileInfo, Options } from 'jscodeshift';
import { hasImportDeclaration, hasImportSpecifier } from '@hypermod/utils';

function hasVariableAlreadyDeclared(
  j: core.JSCodeshift,
  source: ReturnType<typeof j>,
  variableName: string,
) {
  return !!source
    .find(j.VariableDeclaration)
    .find(j.VariableDeclarator)
    .find(j.Identifier)
    .filter(identifier => identifier!.value!.name === variableName).length;
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (
    !hasImportDeclaration(j, source, '@atlaskit/progress-indicator') ||
    !hasImportSpecifier(
      j,
      source,
      'ProgressDots',
      '@atlaskit/progress-indicator',
    )
  ) {
    return fileInfo.source;
  }

  source
    .find(j.ImportDeclaration)
    .find(j.Identifier)
    .filter(identifier => identifier.value.name === 'ProgressDots')
    .replaceWith(j.identifier('ProgressIndicator'));

  if (hasVariableAlreadyDeclared(j, source, 'ProgressIndicator')) {
    source
      .find(j.ImportDeclaration)
      .find(j.ImportSpecifier)
      .filter(specifier => specifier!.node!.local!.name === 'ProgressIndicator')
      .find(j.Identifier)
      .replaceWith(
        j.importSpecifier(
          j.identifier('ProgressIndicator'),
          j.identifier('AKProgressIndicator'),
        ),
      );

    source
      .find(j.VariableDeclarator)
      .find(j.Identifier)
      .filter(identifier => identifier.value.name === 'ProgressDots')
      .replaceWith(j.identifier('AKProgressIndicator'));

    source
      .find(j.JSXIdentifier)
      .filter(identifier => identifier.value.name === 'ProgressDots')
      .replaceWith(j.identifier('AKProgressIndicator'));
  } else {
    source
      .find(j.VariableDeclarator)
      .find(j.Identifier)
      .filter(identifier => identifier.value.name === 'ProgressDots')
      .replaceWith(j.identifier('ProgressIndicator'));
    source
      .find(j.JSXIdentifier)
      .filter(identifier => identifier.value.name === 'ProgressDots')
      .replaceWith(j.identifier('ProgressIndicator'));
  }

  return source.toSource(options.printOptions);
}
