// @ts-ignore
import { name, version } from '../package.json';
import { Command, Option } from 'commander';

const cli = new Command();

export default cli
  .version(version, '-v, --version')
  .name(name)
  .usage('[global options] <file-paths>...')
  .option(
    '-t,--transform <value>',
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
  $ npx @codeshift/cli --packages @mylib/button@3.0.0 /project/src

  # Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0
  $ npx @codeshift/cli --sequence --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src

  # Run the "my-custom-transform" transform
  $ npx @codeshift/cli -t path/to/my-custom-transform /project/src`,
  );
