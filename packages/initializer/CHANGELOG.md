# @codeshift/initializer

## 0.2.2

### Patch Changes

- Updated dependencies [8a8517c]
  - @codeshift/test-utils@0.2.0

## 0.2.1

### Patch Changes

- 2437c03: codeshift/utils needs to be output as a dependency rather than a devdep

## 0.2.0

### Minor Changes

- 78959ae: Updates validation / init logic to be consistent across packages

## 0.1.9

### Patch Changes

- 427405c: Fixed a bug where npmignore in the template directory was being ignored my npm (hehe). This has now been moved into a static string as part of the main pacakge
- 49b7bcb: Usage path module over string concatinations for better cross OS support

## 0.1.8

### Patch Changes

- e776f9c: Fixes colors.js vulnrability by bumping jscodeshift
- Updated dependencies [e776f9c]
  - @codeshift/utils@0.1.5

## 0.1.7

### Patch Changes

- caaaf9a: Locks version of colors.js to avoid vulnrability
- 728624f: Init command can now be called without the transform or preset flag and output an empty directory
- Updated dependencies [caaaf9a]
  - @codeshift/utils@0.1.4

## 0.1.6

### Patch Changes

- 6e160cc: Additional init path releated fixes

## 0.1.5

### Patch Changes

- 2decf6a: Fix output dir path

## 0.1.4

### Patch Changes

- e8cf76e: Releasing all packages to fix version mismatch
- Updated dependencies [e8cf76e]
  - @codeshift/utils@0.1.3

## 0.1.3

### Patch Changes

- 3d14938: Initialiser now uses current @codeshift/util version when publishing pacakges

## 0.1.2

### Patch Changes

- de8f2e5: Refactores Community folder build step

## 0.1.1

### Patch Changes

- a78ad25: Update package configuration and refactors repo scripts
