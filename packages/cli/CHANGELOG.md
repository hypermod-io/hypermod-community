# @codeshift/cli

## 0.9.1

### Patch Changes

- ac17d83: Updates validator logic to check for invalid properties in config files. Also requires configs via absolute paths to make the validation logic more robust
- Updated dependencies [ac17d83]
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
