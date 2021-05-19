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
   * If the package flag is provided, runs all transforms from the provided version to the latest
   */
  sequence?: boolean;
  /**
   * Parser to use for parsing the source files
   */
  parser?: 'babel' | 'babylon' | 'flow' | 'ts' | 'tsx';
  /**
   * Transform files with these file extensions (comma separated list)
   */
  extensions?: string;
  /**
   * Ignore files that match a provided glob expression
   */
  ignorePattern?: string;
}

export default meow(
  `
Usage
  $ npx @codeshift/cli [options] <file-paths>...

Options
  --transform, -t the transform to run, will prompt for a transform if not provided and no module is passed
  --packages, -pkgs, Comma separated list of packages to run transforms for, @scope/package[@version]. If version is supplied, will only run transforms for that version and above
  --sequence, -s, If the package flag is provided, runs all transforms from the provided version to the latest
  --parser, -p babel|babylon|flow|ts|tsx parser to use for parsing the source files (default: babel)
  --extensions, -e transform files with these file extensions (comma separated list) (default: js)
  --ignore-pattern, ignore files that match a provided glob expression
  --version, -v version number
  --help, 😱

Examples
  # Run a transform for "@mylib/button" version 3.0.0 only
  $ npx @codeshift/cli --packages @mylib/button@3.0.0 /project/src

  # Run all transforms for "@mylib/button" greater than version 3.0.0 and @mylib/range greater than 4.0.0
  $ npx @codeshift/cli --sequence --packages @mylib/button@3.0.0,@mylib/range@4.0.0 /project/src

  # Run the "my-custom-transform" transform
  $ npx @codeshift/cli -t path/to/my-custom-transform /project/src

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
      sequence: {
        type: 'boolean',
        alias: 's',
      },
      range: {
        type: 'string',
        alias: 'r',
      },
      parser: {
        type: 'string',
        alias: 'p',
      },
      extensions: {
        type: 'string',
        alias: 'e',
      },
      ignorePattern: {
        type: 'string',
      },
    },
  },
);
