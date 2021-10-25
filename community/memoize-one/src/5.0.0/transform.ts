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
    // looking for calls with a custom equality function
    // .filter(call => call.value.arguments.length === 2)
    .forEach(call => {
      const [first, second] = call.value.arguments;
      if (second == null) {
        return;
      }
      // We are going to wrap the existing customEqualityFn in our new one
      // 4.0.0 EqualityFn → (a, b) => boolean [called for each argument]
      // 5.0.0 EqualityFn → ([newArgs], [lastArgs]) => boolean [called once with all arguments]
      if (
        second.type === 'FunctionExpression' ||
        second.type === 'ArrowFunctionExpression' ||
        second.type === 'Identifier'
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
              j.variableDeclarator(j.identifier('__equalityFn'), second),
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

        call.value.arguments = [first, customEqualityFn];
        return;
      }
    });

  return source.toSource(options.printOptions);
}
