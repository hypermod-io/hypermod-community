import chalk from 'chalk';

import main from './main';
import cli, { Flags } from './cli';
import {
  ValidationError,
  NoTransformsExistError,
  InvalidUserInputError,
} from './errors';

main(cli.input, cli.flags as Flags).catch(e => {
  if (e instanceof ValidationError) {
    console.error(cli.help);
    console.error(chalk.red(e.message));
    process.exit(1);
  }

  if (e instanceof InvalidUserInputError) {
    console.warn(cli.help);
    console.warn(chalk.red(e.message));
    process.exit(9);
  }

  if (e instanceof NoTransformsExistError) {
    console.warn(chalk.yellow(e.message));
    process.exit(0);
  }

  console.error(chalk.red(e));
  process.exit(3);
});
