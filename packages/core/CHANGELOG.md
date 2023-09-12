# @hypermod/core

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
