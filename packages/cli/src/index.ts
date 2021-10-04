import chalk from 'chalk';
import main from './main';
import list from './list';
import init from './init';
import validate from './validate';
import {
  ValidationError,
  NoTransformsExistError,
  InvalidUserInputError,
} from './errors';

import packageJson from '../package.json';
import { Command, Option } from 'commander';

const program = new Command();

program
  .command(`${packageJson.name} [path...]`, { isDefault: true })
  .version(packageJson.version, '-v, --version')
  .usage('[global options] <file-paths>...')
  .option(
    '-t, --transform <value>',
    'The transform to run, will prompt for a transform if not provided and no module is passed',
  )
  .option(
    '--packages <value>',
    'Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms for that version and above',
  )
  .option(
    '-s, --sequence',
    'If the package flag is provided, runs all transforms from the provided version to the latest',
  )
  .addOption(
    new Option(
      '-p, --parser <parser>',
      'Parser to use for parsing the source files',
    )
      .choices(['babel', 'babylon', 'flow', 'ts', 'tsx'])
      .default('babel'),
  )
  .option(
    '-e, --extensions <value>',
    'Transform files with these file extensions (comma separated list)',
    'js',
  )
  .option(
    '--ignore-pattern <value>',
    'Ignore files that match a provided glob expression',
  )
  .addHelpText(
    'after',
    `
Examples:
  # Run a transform for "@mylib/button" version 3.0.0 only
  $ codeshift-cli --packages @mylib/button@3.0.0 /project/src

  # Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0
  $ codeshift-cli --sequence --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src

  # Run the "my-custom-transform" transform
  $ codeshift-cli -t path/to/my-custom-transform /project/src`,
  )
  .action((path, options) => main(path, options));

program
  .command('list <package-names...>')
  .description('list available codemods for provided packages')
  .action(packageNames => list(packageNames));

program
  .command('init [path]')
  .description('creates a new codeshift package')
  .requiredOption('--package-name <value>', 'Name of the package')
  .option('-t, --transform <value>', 'Transform version')
  .option('-p, --preset <value>', 'Preset transfrom')
  .action((path, options) =>
    init(options.packageName, options.transform, options.preset, path),
  )
  .addHelpText(
    'after',
    `
Examples:
  # Initializes a new codeshift package with a transform for 10.0.0
  $ codeshift-cli init --package-name foobar --transform 10.0.0 ~/Desktop

  # Initializes a new codeshift package with a preset "update-imports"
  $ codeshift-cli init --package-name foobar --preset update-imports ~/Desktop
  `,
  );

program
  .command('validate [path]')
  .description('validates if a codeshift package is publishable')
  .action(path => validate(path))
  .addHelpText(
    'after',
    `
Examples:
  $ codeshift-cli validate
  $ codeshift-cli validate ./codemods/my-codemods
  `,
  );

program.exitOverride();

program.parseAsync(process.argv).catch(e => {
  if (e instanceof ValidationError) {
    console.error(program.help());
    console.error(chalk.red(e.message));
    process.exit(1);
  }

  if (e instanceof InvalidUserInputError) {
    console.warn(program.help());
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
