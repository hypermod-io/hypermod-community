# @codeshift/cli

## 0.16.0

### Minor Changes

- aa62194: This package has been renamed to `@hypermod/cli`.

  No API changes were performed as part of this change, use `@hypermod/cli` as a direct replacement the package has simply been renamed.

  It can now be run via `$ hypermod` or `$ hypermod-cli` or `$ npx @hypermod/cli`.

  The alias package `@codeshift/cli` will continue to exist as a way for existing users to continue to receive updates **but will be removed in the future**.

### Patch Changes

- Updated dependencies [aa62194]
- Updated dependencies [aa62194]
  - @hypermod/cli@0.16.0

## 0.15.6

### Patch Changes

- b9d4ba1: Bumps defective version of live-plugin-manager
- Updated dependencies [b9d4ba1]
  - @codeshift/fetcher@0.3.4

## 0.15.5

### Patch Changes

- dd4867b: Bumps live-plugin-manager to surface minor bug fixes
- Updated dependencies [dd4867b]
  - @codeshift/fetcher@0.3.3

## 0.15.4

### Patch Changes

- b7f614e: Correctly checks remote pacakge entrypoints for configs (as opposed to just checking for codeshift.config.js files)
- Updated dependencies [b7f614e]
  - @codeshift/fetcher@0.3.2

## 0.15.3

### Patch Changes

- 8cf9a4b: Fixes config path parsing
- Updated dependencies [8cf9a4b]
  - @codeshift/core@0.1.2

## 0.15.2

### Patch Changes

- 4d55055: Parcel now bundles these deps with a Node target
- 157f755: Removes typescript/js interop layer from the CLI in favour of just pointing to the built dist files.
- Updated dependencies [157f755]
- Updated dependencies [4d55055]
  - @codeshift/core@0.1.1
  - @codeshift/initializer@0.4.9
  - @codeshift/validator@0.5.1
  - @codeshift/fetcher@0.3.1

## 0.15.1

### Patch Changes

- e3f5a15: Fixes bin entrypoint for CLI

## 0.15.0

### Minor Changes

- 1a74e85: Internal refactor in order to remove the use of require.resolve in codeshift.config.js files.

### Patch Changes

- Updated dependencies [5416983]
- Updated dependencies [1a74e85]
  - @codeshift/fetcher@0.3.0
  - @codeshift/core@0.1.0
  - @codeshift/validator@0.5.0

## 0.14.1

### Patch Changes

- 8255eb2: Packages are now built with pareljs. Entrypoints have been updated to match
- Updated dependencies [8255eb2]
- Updated dependencies [8255eb2]
  - @codeshift/core@0.0.1
  - @codeshift/fetcher@0.2.1
  - @codeshift/initializer@0.4.7
  - @codeshift/types@0.0.7
  - @codeshift/validator@0.4.4

## 0.14.0

### Minor Changes

- bbc8fb8: Allow for an alternate npm registry and registryToken to be passed when calling the cli.

### Patch Changes

- @codeshift/initializer@0.4.4

## 0.13.0

### Minor Changes

- 72abeaa: Allows to use the sequence flag in a monorepo development context

### Patch Changes

- @codeshift/initializer@0.4.3

## 0.12.0

### Minor Changes

- 6d624ad: CLI will now list all matching codeshift.config files based on your workspace configuration (To support monorepos)

### Patch Changes

- 985c0e9: Correctly output "next steps" logs when using the init command, based on the --config-only command
- Updated dependencies [25164fe]
- Updated dependencies [6d624ad]
  - @codeshift/initializer@0.4.0
  - @codeshift/fetcher@0.2.0
  - @codeshift/validator@0.4.3

## 0.11.4

### Patch Changes

- 1ffc6bf: Omitting transforms from the package flag will now display a prompt instead of throwing an error
  - @codeshift/initializer@0.3.5

## 0.11.3

### Patch Changes

- fb7c59a: dependencies installed by the CLI will now be output to a nested node_modules dir instead of .plugin_packages
  - @codeshift/initializer@0.3.4

## 0.11.2

### Patch Changes

- 4d54ea0: Emit the full stack trace when a fetch package + eval config error occurs
- 60f1196: Registers ts-node regardless of dev/prod usage to allow for requires/require.resolve of ts files via configs
  - @codeshift/initializer@0.3.3

## 0.11.1

### Patch Changes

- Updated dependencies [2a116ba]
  - @codeshift/types@0.0.6
  - @codeshift/fetcher@0.1.1
  - @codeshift/validator@0.4.2
  - @codeshift/initializer@0.3.2

## 0.11.0

### Minor Changes

- c24d9e9: CLI now prompts users with codemods from their local codeshift.config.js files.

### Patch Changes

- Updated dependencies [c24d9e9]
  - @codeshift/fetcher@0.1.0
  - @codeshift/initializer@0.3.1
  - @codeshift/validator@0.4.1

## 0.10.0

### Minor Changes

- 380ed84: Codeshift projects can now be initialized a config file only via the `init --config-only` command.

  Initialized projects now contain a README with helpful getting started information.

  The init command now outputs getting started tips + commands

### Patch Changes

- 1d034ab: The internal package fetching logic has now been abstracted and reused in both the list and main CLI commands
- Updated dependencies [380ed84]
  - @codeshift/initializer@0.3.0
  - @codeshift/validator@0.4.0

## 0.9.1

### Patch Changes

- e5787a9: Updates validator logic to check for invalid properties in config files. Also requires configs via absolute paths to make the validation logic more robust
- Updated dependencies [e5787a9]
  - @codeshift/fetcher@0.0.3
  - @codeshift/validator@0.3.1
  - @codeshift/initializer@0.2.2

## 0.9.0

### Minor Changes

- e491844: Codemods and dependencies are downloaded relative to the CLI package installation for consistency/stability reasons

## 0.8.0

### Minor Changes

- 0379577: Adds sensible defaults as CLI options. Affecting flags --ignore-path, --extensions and --parser
- 3c390c1: Improves loading behaviour with spinners and status updates. Also exposes --verbose flag for more granular logging

### Patch Changes

- Updated dependencies [78959ae]
  - @codeshift/initializer@0.2.0
  - @codeshift/validator@0.3.0

## 0.7.8

### Patch Changes

- d0ebfd5: Fixed bug where --version & --help are presented as errors
- Updated dependencies [427405c]
- Updated dependencies [49b7bcb]
  - @codeshift/initializer@0.1.9

## 0.7.7

### Patch Changes

- 7e3a6d9: Internal refactor, CLI now uses fetcher package
- Updated dependencies [b35609d]
- Updated dependencies [7e3a6d9]
  - @codeshift/validator@0.2.4
  - @codeshift/fetcher@0.0.2

## 0.7.6

### Patch Changes

- f6bd632: Fixes --help command. Top-level options will now be shown correctly

## 0.7.5

### Patch Changes

- 5133c81: Minor fix to list command
- cee218e: Update generated project dependencies to avoid colors.js vulnrability.

## 0.7.4

### Patch Changes

- 276e5bb: Return if list finds an invalid package

## 0.7.3

### Patch Changes

- e776f9c: Fixes colors.js vulnrability by bumping jscodeshift
- Updated dependencies [e776f9c]
  - @codeshift/initializer@0.1.8
  - @codeshift/validator@0.2.3

## 0.7.2

### Patch Changes

- 1cf710f: Fixes how the CLI renders errors to users

## 0.7.1

### Patch Changes

- caaaf9a: Locks version of colors.js to avoid vulnrability
- 728624f: Init command can now be called without the transform or preset flag and output an empty directory
- 4781125: List CLI command no longer exits on error. Instead it will log a message
- 450c977: Adds new primary CLI alias `codeshift` (as opposed to just `codeshift-cli`)
- Updated dependencies [caaaf9a]
- Updated dependencies [728624f]
  - @codeshift/initializer@0.1.7
  - @codeshift/validator@0.2.2

## 0.7.0

### Minor Changes

- 2f5f72f: Adds the ability to specify a comma seperated list of transforms via the -t flag

## 0.6.3

### Patch Changes

- 6e160cc: Additional init path releated fixes
- Updated dependencies [6e160cc]
  - @codeshift/initializer@0.1.6

## 0.6.2

### Patch Changes

- Updated dependencies [2decf6a]
  - @codeshift/initializer@0.1.5

## 0.6.1

### Patch Changes

- e8cf76e: Releasing all packages to fix version mismatch
- Updated dependencies [e8cf76e]
  - @codeshift/initializer@0.1.4
  - @codeshift/validator@0.2.1

## 0.6.0

### Minor Changes

- 30bf0cf: Codemods can now be sourced from standalone npm packages such as react as long as they provide a codeshift.config.js. This allows for greater flexibility for where codemods may be distributed

### Patch Changes

- Updated dependencies [30bf0cf]
  - @codeshift/validator@0.2.0

## 0.5.0

### Minor Changes

- 8bbe2a6: Adds auxiliary flags for jscodeshift

## 0.4.0

### Minor Changes

- b316132: CLI Init command now supports the ability to create a stub preset

## 0.3.0

### Minor Changes

- 7f1e99c: CLI now supports configs exported with cjs and es module types

### Patch Changes

- bbca56f: Fixes a bug where consistent option names used across default and subcommands were breaking.
- e9b263e: CLI will no longer error if either transforms or presets were undefined in the config

## 0.2.2

### Patch Changes

- 216dd18: Reverts binary change

## 0.2.1

### Patch Changes

- 73f5a59: Use default binary name

## 0.2.0

### Minor Changes

- 83923eb: CLI now supports the concept of presets, for cases where non-versioned codemods are necessary. Also exposes the cli binary as @codeshift/cli

## 0.1.9

### Patch Changes

- ad76039: CLI can now properly run packaged codemods without dangerously looking for files
- 49b5762: Updates cli identifier to the correct name + updates docs accordingly

## 0.1.8

### Patch Changes

- Updated dependencies [3d14938]
  - @codeshift/initializer@0.1.3

## 0.1.7

### Patch Changes

- Updated dependencies [de8f2e5]
  - @codeshift/initializer@0.1.2

## 0.1.6

### Patch Changes

- a78ad25: Update package configuration and refactors repo scripts
- Updated dependencies [a78ad25]
  - @codeshift/initializer@0.1.1
  - @codeshift/validator@0.1.1

## 0.1.5

### Patch Changes

- 5748332: Adds npmignore to avoid publishing unwanted files and folders

## 0.1.4

### Patch Changes

- 9f1d028: Updates babel config to fix cli issue

## 0.1.3

### Patch Changes

- 07212c0: Fix entrypoint

## 0.1.2

### Patch Changes

- 71388b0: Swaps out Meow for Commander.js
- 1e3c85b: Refactor CLI internals to better leverage commander.js + Adds list command

## 0.1.1

### Patch Changes

- c412dc7: Adds sequence flag
- 473473e: Minor internal tweaks
