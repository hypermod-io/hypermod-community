import meow from 'meow';

export interface Flags {
  /**
   * The transform to run
   */
  transform?: string;
  /**
   * Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms above that version
   */
  packages?: string;
  /**
   * Parser to use for parsing the source files
   */
  parser: 'babel' | 'babylon' | 'flow' | 'ts' | 'tsx';
}

export default meow(
  `
Usage
  $ npx @codeshift/cli [options] <file-paths>...

Options
  --transform, -t the transform to run, will prompt for a transform if not provided and no module is passed
  --packages, runs transforms for the specified comma separated list of packages, optionally include a version for each package to run all transforms since that version
  --parser, -p babel|babylon|flow|ts|tsx parser to use for parsing the source files (default: babel)
  --fail-on-error return a 1 exit code when errors were found during execution of codemods
  --version, -v version number
  --help, 😱

Examples
  # Run all transforms for "@atlaskit/button" greater than version 3.0.0 and @atlaskit/range greater than 4.0.0
  $ npx @codeshift/cli --packages @atlaskit/button@3.0.0,@atlaskit/range@4.0.0 /project/src

  # Run the "my-custom-transform" transform of the "button" package
  $ npx @codeshift/cli -t my-custom-transform /project/src

`,
  {
    flags: {
      transform: {
        type: 'string',
        alias: 't',
      },
      packages: {
        type: 'string',
      },
      parser: {
        type: 'string',
        alias: 'p',
      },
    },
  },
);
