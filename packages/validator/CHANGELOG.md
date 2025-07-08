# @hypermod/validator

## 0.8.0

### Minor Changes

- 68eabcf: Bump CLI to surface changes to App package downloads

### Patch Changes

- Updated dependencies [68eabcf]
  - @hypermod/fetcher@0.11.0
  - @hypermod/types@0.3.0

## 0.7.0

### Minor Changes

- c17dd18: Require node 20.17 in support of moving from CJS to ESM

### Patch Changes

- 425fdef: Various configuration changes in support of ESM.
- Updated dependencies [c17dd18]
- Updated dependencies [b6714d3]
  - @hypermod/fetcher@0.10.0

## 0.6.9

### Patch Changes

- Updated dependencies [2c9ae26]
  - @hypermod/fetcher@0.9.0

## 0.6.8

### Patch Changes

- Updated dependencies [0f471c5]
- Updated dependencies [0f471c5]
  - @hypermod/types@0.2.0
  - @hypermod/fetcher@0.8.0

## 0.6.7

### Patch Changes

- Updated dependencies [4c8ce78]
  - @hypermod/fetcher@0.7.0

## 0.6.6

### Patch Changes

- ea20de1: Renames type `CodeshiftConfig` to `Config` (with backwards compatible alias)
- Updated dependencies [401823f]
- Updated dependencies [ea20de1]
  - @hypermod/fetcher@0.6.0
  - @hypermod/types@0.1.2

## 0.6.5

### Patch Changes

- 6e3ab50: Fixes usage of fetchConfig to account for undefined. Now errors should be reported correctly
- Updated dependencies [6e3ab50]
  - @hypermod/fetcher@0.5.3

## 0.6.4

### Patch Changes

- ecdf9cb0: Remove src dir from npm
- Updated dependencies [ecdf9cb0]
  - @hypermod/fetcher@0.5.2

## 0.6.3

### Patch Changes

- 4a89dd20: Bumps typescript to 5.2.2
- Updated dependencies [4a89dd20]
  - @hypermod/fetcher@0.5.1
  - @hypermod/types@0.1.1

## 0.6.2

### Patch Changes

- 671072a7: Removes unused dependencies
- Updated dependencies [671072a7]
- Updated dependencies [671072a7]
  - @hypermod/fetcher@0.5.0

## 0.6.1

### Patch Changes

- e3a648f3: Remove references to Codeshift
- Updated dependencies [e3a648f3]
  - @hypermod/fetcher@0.4.1

## 0.6.0

### Minor Changes

- aa62194: This package has moved scopes from `@codeshift` to `@hypermod`. All internal `@codeshift` dependencies and references have been updated as a result.

### Patch Changes

- Updated dependencies [aa62194]
  - @hypermod/fetcher@0.4.0
  - @hypermod/types@0.1.0

## 0.5.1

### Patch Changes

- 4d55055: Parcel now bundles these deps with a Node target
- Updated dependencies [4d55055]
  - @codeshift/fetcher@0.3.1

## 0.5.0

### Minor Changes

- 1a74e85: Internal refactor in order to remove the use of require.resolve in codeshift.config.js files.

### Patch Changes

- Updated dependencies [5416983]
- Updated dependencies [1a74e85]
  - @codeshift/fetcher@0.3.0

## 0.4.4

### Patch Changes

- 8255eb2: Packages are now built with pareljs. Entrypoints have been updated to match
- Updated dependencies [8255eb2]
  - @codeshift/fetcher@0.2.1
  - @codeshift/types@0.0.7

## 0.4.3

### Patch Changes

- Updated dependencies [6d624ad]
  - @codeshift/fetcher@0.2.0

## 0.4.2

### Patch Changes

- Updated dependencies [2a116ba]
  - @codeshift/types@0.0.6
  - @codeshift/fetcher@0.1.1

## 0.4.1

### Patch Changes

- Updated dependencies [c24d9e9]
  - @codeshift/fetcher@0.1.0

## 0.4.0

### Minor Changes

- 380ed84: Codeshift projects can now be initialized a config file only via the `init --config-only` command.

  Initialized projects now contain a README with helpful getting started information.

  The init command now outputs getting started tips + commands

## 0.3.1

### Patch Changes

- e5787a9: Updates validator logic to check for invalid properties in config files. Also requires configs via absolute paths to make the validation logic more robust
- Updated dependencies [e5787a9]
  - @codeshift/fetcher@0.0.3

## 0.3.0

### Minor Changes

- 78959ae: Updates validation / init logic to be consistent across packages

## 0.2.4

### Patch Changes

- b35609d: Adds additional test coverage to the validator package
- Updated dependencies [7e3a6d9]
  - @codeshift/fetcher@0.0.2

## 0.2.3

### Patch Changes

- e776f9c: Fixes colors.js vulnrability by bumping jscodeshift
- Updated dependencies [e776f9c]
  - @codeshift/types@0.0.5

## 0.2.2

### Patch Changes

- caaaf9a: Locks version of colors.js to avoid vulnrability
- Updated dependencies [caaaf9a]
  - @codeshift/types@0.0.4

## 0.2.1

### Patch Changes

- e8cf76e: Releasing all packages to fix version mismatch
- Updated dependencies [e8cf76e]
  - @codeshift/types@0.0.3

## 0.2.0

### Minor Changes

- 30bf0cf: Fundamentally simplifies and improves on how validation works.

### Patch Changes

- Updated dependencies [30bf0cf]
  - @codeshift/types@0.0.2

## 0.1.1

### Patch Changes

- a78ad25: Update package configuration and refactors repo scripts
