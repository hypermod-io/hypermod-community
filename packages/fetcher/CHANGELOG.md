# @hypermod/fetcher

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
