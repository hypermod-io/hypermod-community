import chalk from 'chalk';
import { Command, Option, CommanderError } from 'commander';

import main from './main';
import list from './list';
import init from './init';
import validate from './validate';
import { InvalidUserInputError, InvalidConfigError } from './errors';

import packageJson from '../package.json';

const program = new Command();

program
  .enablePositionalOptions()
  .version(packageJson.version, '-v, --version')
  .name('codeshift')
  .argument('[path...]')
  .usage('[global options] <file-paths>...')
  .option(
    '--packages <value>',
    'Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms for that version and above',
  )
  .option(
    '-s, --sequence',
    'If the package flag is provided, runs all transforms from the provided version to the latest',
  )
  .option(
    '-t, --transform <value>',
    'The transform(s) to run, will prompt for a transform if not provided and no module is passed\nTo provide multiple transforms, separate them with commas (e.g. "-t t1,t2,t3")',
  )
  .addOption(
    new Option(
      '-p, --parser <parser>',
      'Parser to use for parsing the source files',
    )
      .choices(['babel', 'babylon', 'flow', 'ts', 'tsx'])
      .default('tsx'),
  )
  .option(
    '-e, --extensions <value>',
    'Transform files with these file extensions (comma separated list)',
    'js, jsx, ts, tsx',
  )
  .option(
    '--ignore-pattern <value>',
    'Ignore files that match a provided glob expression',
    '**/node_modules/**',
  )
  .option(
    '-c, --cpus <value>',
    'Start at most N child processes to process source files',
  )
  .option('-d, --dry', 'dry run (no changes are made to files)')
  .option('--run-in-band', 'run serially in the current process')
  .addOption(
    new Option(
      '--verbose <parser>',
      'Show more information about the transform process',
    )
      .choices(['0', '1', '2'])
      .default('0'),
  )
  .addHelpText(
    'after',
    `
Examples:
  # Run a transform for "@mylib/button" version 3.0.0 only
  $ codeshift --packages @mylib/button@3.0.0 /project/src

  # Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0
  $ codeshift --sequence --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src

  # Run the "my-custom-transform" transform
  $ codeshift -t path/to/my-custom-transform /project/src`,
  )
  .action((path, options) => main(path, options));

program
  .command('list <package-names...>')
  .description('list available codemods for provided packages')
  .action(packageNames => list(packageNames))
  .addHelpText(
    'after',
    `
Examples:
  # Print a list of available codemods for a single package
  $ codeshift list mylib

  # Print a list of available codemods for multiple packages
  $ codeshift list @atlaskit/avatar @emotion/monorepo`,
  );

program
  .command('init [path]')
  .description('creates a new codeshift package')
  .option('-c, --config-only', 'Output only a configuration file')
  .option('-t, --transform <value>', 'Transform version')
  .option('-p, --preset <value>', 'Preset transfrom')
  .action((path, options) =>
    init(options.transform, options.preset, options.configOnly, path),
  )
  .addHelpText(
    'after',
    `
Examples:
  # Initializes an empty codeshift package at the current directory
  $ codeshift init --transform 10.0.0 my-codemod-package

  # Initializes an empty codeshift package at the current directory
  $ codeshift init --transform 10.0.0 .

  # Initializes a new codeshift package with a transform for 10.0.0 at the foobar dir
  $ codeshift init --transform 10.0.0 ~/foobar

  # Initializes a new codeshift package with a preset "update-imports"
  $ codeshift init --package-name foobar --preset update-imports foobar

  # Initializes a configuration file only
  $ codeshift init --config-only --preset update-imports path/to/src`,
  );

program
  .command('validate [path]')
  .description('validates if a codeshift package is publishable')
  .action(path => validate(path))
  .addHelpText(
    'after',
    `
Examples:
  $ codeshift validate
  $ codeshift validate ./codemods/my-codemods`,
  );

program.exitOverride();

(async function () {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    if (error instanceof CommanderError) {
      if (
        error.code === 'commander.helpDisplayed' ||
        error.code === 'commander.version'
      ) {
        return;
      }

      console.error(chalk.red(error.message));
      process.exit(error.exitCode);
    }

    if (error instanceof InvalidUserInputError) {
      console.warn(program.help());
      console.warn(chalk.red(error.message));
      process.exit(9);
    }

    if (error instanceof InvalidConfigError) {
      console.warn(chalk.red(error.message));
      process.exit(7);
    }

    console.error(chalk.red(error));
    process.exit(1);
  }
})();
