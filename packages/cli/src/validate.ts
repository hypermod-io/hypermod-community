// hypermod: Run "tsc" to verify the updated @types/jscodeshift@1.0.0 types.
import chalk from 'chalk';

import { isValidConfigAtPath } from '@hypermod/validator';

export default async function validate(targetPath = '.') {
  await isValidConfigAtPath(targetPath);

  console.log(chalk.green('Valid ✅'));
}
