# @hypermod/core

## 0.6.1

### Patch Changes

- 432cd18: Patches issue with app codemod downloads + silences experimental loader logging

## 0.6.0

### Minor Changes

- 68eabcf: Bump CLI to surface changes to App package downloads

## 0.5.0

### Minor Changes

- 6baffa1: Bumps jscodeshift to the latest version to surface bug fixes and various improvements. Note: this may inherently change how files are parsed and transformed.

## 0.4.0

### Minor Changes

- c17dd18: Require node 20.17 in support of moving from CJS to ESM

## 0.3.0

### Minor Changes

- 4c8ce78: Removes unused Flow parser, bumps babel presets/plugins, fixes a minor bug where transforms could be detected in preset strings

## 0.2.3

### Patch Changes

- 039fe2d: Fixes parsing of the default options for the extensions flag

## 0.2.2

### Patch Changes

- fba0b75d: Fixes missing lib files

## 0.2.1

### Patch Changes

- 4a89dd20: Bumps typescript to 5.2.2

## 0.2.0

### Minor Changes

- aa62194: This package has moved scopes from `@codeshift` to `@hypermod`. All internal `@codeshift` dependencies and references have been updated as a result.

## 0.1.4

### Patch Changes

- 4af1108: Improves module parsing to account for different import schemes

## 0.1.3

### Patch Changes

- c5c531d: Fixes direct transform urls via the --tranform flag

## 0.1.2

### Patch Changes

- 8cf9a4b: Fixes config path parsing

## 0.1.1

### Patch Changes

- 157f755: Only use a single path when importing the Worker regardless of process.env
- 4d55055: Parcel now bundles these deps with a Node target

## 0.1.0

### Minor Changes

- 1a74e85: Internal refactor in order to remove the use of require.resolve in codeshift.config.js files.

## 0.0.1

### Patch Changes

- 8255eb2: Inital release of @codeshift/core which is a partial fork of JSCodeshift.
