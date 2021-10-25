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

  /**
   * Early exit condition
   * -----
   * It is often good practice to exit early and return the original source file
   * if it does not contain code relevant to the codemod.
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/your-first-codemod#output
   */
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
      if (
        second.type === 'FunctionExpression' ||
        second.type === 'ArrowFunctionExpression'
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
                        // computed lastArgs[index]
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

      if (second.type === 'Identifier') {
      }
    });

  /**
   * Codemod logic goes here 👇
   * -----
   * This is where the core logic for your codemod will go,
   * consider grouping specific actions into 'motions' and running them in sequence
   *
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/authoring#motions
   */
  // source.findVariableDeclarators('foo').renameTo('bar');

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
