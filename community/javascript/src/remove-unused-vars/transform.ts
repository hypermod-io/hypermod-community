import { FileInfo } from 'jscodeshift';
// @ts-expect-error
import putout from 'putout';
// @ts-expect-error
import removeUnusedVariables from '@putout/plugin-remove-unused-variables';

export default function transformer(file: FileInfo) {
  const output = putout(file.source, {
    plugins: [['remove-unused-variables', removeUnusedVariables]],
  });

  return output.code;
}
