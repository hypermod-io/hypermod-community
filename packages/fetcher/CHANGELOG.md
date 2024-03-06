# @hypermod/fetcher

## 0.9.0

### Minor Changes

- 2c9ae26: Removes whitelist dependency fetching, this approach no longer works.

## 0.8.1

### Patch Changes

- d7592d3: Force another bump to expose the latest bug fixes

## 0.8.0

### Minor Changes

- 0f471c5: Adds experimental dependency property for whitelisting devdeps in co-located modules

### Patch Changes

- Updated dependencies [0f471c5]
  - @hypermod/types@0.2.0

## 0.7.0

### Minor Changes

- 4c8ce78: Removes unused Flow parser, bumps babel presets/plugins, fixes a minor bug where transforms could be detected in preset strings

## 0.6.1

### Patch Changes

- 885c4d6: Fixes logic to locate configs when bundled in deeply nested directories

## 0.6.0

### Minor Changes

- 401823f: Adds typescript support for config requires. Now a config can be in TS/TSX etc.

### Patch Changes

- ea20de1: Renames type `CodeshiftConfig` to `Config` (with backwards compatible alias)
- Updated dependencies [ea20de1]
  - @hypermod/types@0.1.2

## 0.5.3

### Patch Changes

- 6e3ab50: Correctly types fetchConfig function to correctly show that this function can return `undefined`

## 0.5.2

### Patch Changes

- ecdf9cb0: Remove src dir from npm

## 0.5.1

### Patch Changes

- 4a89dd20: Bumps typescript to 5.2.2
- Updated dependencies [4a89dd20]
  - @hypermod/types@0.1.1

## 0.5.0

### Minor Changes

- 671072a7: Added blacklist to remote package fetcher to ensure dependencies such as `javascript` aren't downloaded since they will never contain a hypermod.config file.

### Patch Changes

- 671072a7: Removes unused dependencies

## 0.4.1

### Patch Changes

- e3a648f3: Remove references to Codeshift

## 0.4.0

### Minor Changes

- aa62194: This package has moved scopes from `@codeshift` to `@hypermod`. All internal `@codeshift` dependencies and references have been updated as a result.

### Patch Changes

- Updated dependencies [aa62194]
  - @hypermod/types@0.1.0

## 0.3.5

### Patch Changes

- 9ec0f95: Adds development logging for quick debugging

## 0.3.4

### Patch Changes

- b9d4ba1: Bumps defective version of live-plugin-manager

## 0.3.3

### Patch Changes

- dd4867b: Bumps live-plugin-manager to surface minor bug fixes

## 0.3.2

### Patch Changes

- b7f614e: Correctly checks remote package entrypoints for configs (as opposed to just checking for codeshift.config.js files)

## 0.3.1

### Patch Changes

- 4d55055: Parcel now bundles these deps with a Node target

## 0.3.0

### Minor Changes

- 5416983: Fetcher now returns entrypoint filepath.
- 1a74e85: Internal refactor in order to remove the use of require.resolve in codeshift.config.js files.

## 0.2.1

### Patch Changes

- 8255eb2: Packages are now built with pareljs. Entrypoints have been updated to match
- Updated dependencies [8255eb2]
  - @codeshift/types@0.0.7

## 0.2.0

### Minor Changes

- 6d624ad: Adds fetchConfigs function, which will return multiple config files if the glob matches them

## 0.1.1

### Patch Changes

- Updated dependencies [2a116ba]
  - @codeshift/types@0.0.6

## 0.1.0

### Minor Changes

- c24d9e9: CLI now prompts users with codemods from their local codeshift.config.js files.

## 0.0.3

### Patch Changes

- e5787a9: Updates validator logic to check for invalid properties in config files. Also requires configs via absolute paths to make the validation logic more robust

## 0.0.2

### Patch Changes

- 7e3a6d9: Initial release
