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
  --packages -pkgs, Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms above that version
  --version, -v version number
  --parser, -p babel|babylon|flow|ts|tsx parser to use for parsing the source files (default: babel)
  --help, 😱

Examples
  # Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0
  $ npx @codeshift/cli --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src

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
        alias: 'pkgs',
      },
      range: {
        type: 'string',
        alias: 'r',
      },
      parser: {
        type: 'string',
        alias: 'p',
      },
    },
  },
);
