import core, { API, FileInfo, Options, Collection } from 'jscodeshift';

import { hasImportSpecifier } from '@hypermod/utils';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  if (!hasTestUtilsImport(j, source)) {
    return file.source;
  }

  // Replace the import of defineInlineTest with applyTransform from '@hypermod/utils'
  replaceImport(j, source);

  // Transform defineInlineTest calls to it function with applyTransform
  transformDefineInlineTestCalls(j, source);

  return source.toSource(options);
}

function replaceImport(j: core.JSCodeshift, source: Collection<any>) {
  // Remove defineInlineTest import or require
  source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'jscodeshift/dist/testUtils')
    .remove();

  source
    .find(j.VariableDeclarator)
    .filter(path => {
      return (
        path.node.init &&
        // @ts-expect-error
        path.node.init.object &&
        // @ts-expect-error
        path.node.init.object.callee &&
        // @ts-expect-error
        path.node.init.object.callee.name === 'require' &&
        // @ts-expect-error
        path.node.init.object.arguments.length &&
        // @ts-expect-error
        path.node.init.object.arguments[0].value ===
          'jscodeshift/dist/testUtils'
      );
    })
    .remove();

  if (hasImportSpecifier(j, source, 'applyTransform', '@hypermod/utils')) {
    return;
  }

  // Insert the applyTransform import
  const applyTransformImport = j.importDeclaration(
    [j.importSpecifier(j.identifier('applyTransform'))],
    j.stringLiteral('@hypermod/utils'),
  );

  // Insert the new import at the top of the file
  source.get().node.program.body.unshift(applyTransformImport);
}

function hasTestUtilsImport(j: core.JSCodeshift, source: Collection<any>) {
  const hasRequireStatement = source.find(j.VariableDeclarator).filter(path => {
    return (
      path.node.init &&
      // @ts-expect-error
      path.node.init.object &&
      // @ts-expect-error
      path.node.init.object.callee &&
      // @ts-expect-error
      path.node.init.object.callee.name === 'require' &&
      // @ts-expect-error
      path.node.init.object.arguments.length &&
      // @ts-expect-error
      path.node.init.object.arguments[0].value === 'jscodeshift/dist/testUtils'
    );
  }).length;

  return (
    hasImportSpecifier(j, source, 'applyTransform', '@hypermod/utils') ||
    hasRequireStatement
  );
}

function transformDefineInlineTestCalls(
  j: core.JSCodeshift,
  source: Collection<any>,
) {
  source
    .find(j.CallExpression)
    .filter(
      path =>
        // @ts-expect-error
        path.node.callee.name === 'defineInlineTest' ||
        // @ts-expect-error
        (path.node.callee.property &&
          // @ts-expect-error
          path.node.callee.property.name === 'defineInlineTest'),
    )
    .forEach(path => {
      const [transformerOpts, input, output, description] = path.node.arguments;

      const transformer = j(transformerOpts).find(j.ObjectProperty, {
        key: { name: 'default' },
      });

      const parser = j(transformerOpts).find(j.ObjectProperty, {
        key: { name: 'parser' },
      });

      if (!parser.length || !transformer.length) {
        throw new Error('Parser or transformer not found');
      }

      // Create the async arrow function for the test body
      const testBody = j.blockStatement([
        j.variableDeclaration('const', [
          j.variableDeclarator(
            j.identifier('result'),
            j.awaitExpression(
              j.callExpression(j.identifier('applyTransform'), [
                transformer.get().value.value,
                input,
                j.objectExpression([parser.get().value]),
              ]),
            ),
          ),
        ]),
        j.expressionStatement(
          j.callExpression(
            j.memberExpression(
              j.callExpression(j.identifier('expect'), [
                j.identifier('result'),
              ]),
              j.identifier('toMatchInlineSnapshot'),
            ),
            [output],
          ),
        ),
      ]);

      const asyncArrowFunction = j.arrowFunctionExpression([], testBody, true);
      // https://github.com/benjamn/ast-types/issues/264#issuecomment-384392685
      asyncArrowFunction.async = true;

      // Create the it function call
      const itFunctionCall = j.callExpression(j.identifier('it'), [
        description,
        asyncArrowFunction,
      ]);

      // Replace the original call with the new it function call
      j(path).replaceWith(itFunctionCall);
    });
}
