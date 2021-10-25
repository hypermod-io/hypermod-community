import {
  hasImportDeclaration,
  getDefaultImportSpecifierName,
} from '@codeshift/utils';
import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  // Exit early if file is not importing memoize-one
  if (!hasImportDeclaration(j, source, 'memoize-one')) {
    return file.source;
  }

  const importName = getDefaultImportSpecifierName(j, source, 'memoize-one');

  source
    .find(j.CallExpression)
    // looking for calls to memoize-one
    .filter(
      call =>
        call.value.callee.type === 'Identifier' &&
        call.value.callee.name === importName,
    )
    // .filter(call => call.value.arguments.length === 2)
    .forEach(call => {
      const equalityFn = call.value.arguments[1];
      // we don't need to do anything for calls without an equality fn
      if (equalityFn == null) {
        return;
      }
      // We are going to wrap the existing customEqualityFn in our new one
      // 4.0.0 EqualityFn → (a, b) => boolean [called for each argument]
      // 5.0.0 EqualityFn → ([newArgs], [lastArgs]) => boolean [called once with all arguments]
      if (
        equalityFn.type === 'FunctionExpression' ||
        equalityFn.type === 'ArrowFunctionExpression' ||
        equalityFn.type === 'Identifier'
      ) {
        const customEqualityFn = j.arrowFunctionExpression(
          [j.identifier('newArgs'), j.identifier('lastArgs')],
          j.blockStatement([
            j.ifStatement(
              j.binaryExpression(
                '!==',
                j.memberExpression(
                  j.identifier('newArgs'),
                  j.identifier('length'),
                ),
                j.memberExpression(
                  j.identifier('lastArgs'),
                  j.identifier('length'),
                ),
              ),
              j.blockStatement([j.returnStatement(j.booleanLiteral(false))]),
            ),
            j.variableDeclaration('const', [
              j.variableDeclarator(j.identifier('__equalityFn'), equalityFn),
            ]),
            j.returnStatement(
              j.callExpression(
                j.memberExpression(
                  j.identifier('newArgs'),
                  j.identifier('every'),
                ),
                [
                  j.arrowFunctionExpression(
                    [j.identifier('newArg'), j.identifier('index')],
                    j.callExpression(j.identifier('__equalityFn'), [
                      j.identifier('newArg'),
                      j.memberExpression(
                        j.identifier('lastArgs'),
                        j.identifier('index'),
                        // computed: lastArgs[index]
                        true,
                      ),
                    ]),
                  ),
                ],
              ),
            ),
          ]),
        );

        call.value.arguments[1] = customEqualityFn;
        return;
      }
    });

  return source.toSource(options.printOptions);
}
