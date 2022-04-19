import chalk from 'chalk';

import { isValidConfigAtPath } from '@codeshift/validator';

export default async function validate(targetPath = '.') {
  await isValidConfigAtPath(targetPath);

  console.log(chalk.green('Valid ✅'));
}
