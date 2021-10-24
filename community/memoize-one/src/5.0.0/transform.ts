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
  if (true) {
    return file.source;
  }

  /**
   * Codemod logic goes here 👇
   * -----
   * This is where the core logic for your codemod will go,
   * consider grouping specific actions into 'motions' and running them in sequence
   *
   * See this page for more information:
   * https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/authoring#motions
   */
  source.findVariableDeclarators('foo').renameTo('bar');

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
