# @codeshift/initializer

## 0.4.9

### Patch Changes

- 4d55055: Parcel now bundles these deps with a Node target
- Updated dependencies [4d55055]
- Updated dependencies [157f755]
  - @codeshift/test-utils@0.3.2
  - @codeshift/utils@0.2.4
  - @codeshift/cli@0.15.2

## 0.4.8

### Patch Changes

- 5479243: Adds parcel-cache to generated gitignore

## 0.4.7

### Patch Changes

- 8255eb2: Packages are now built with pareljs. Entrypoints have been updated to match
- Updated dependencies [26254c4]
- Updated dependencies [8255eb2]
  - @codeshift/utils@0.2.3
  - @codeshift/cli@0.14.1
  - @codeshift/test-utils@0.3.1

## 0.4.6

### Patch Changes

- Updated dependencies [b9a28ab]
  - @codeshift/utils@0.2.2

## 0.4.5

### Patch Changes

- Updated dependencies [d239ca6]
  - @codeshift/utils@0.2.1

## 0.4.4

### Patch Changes

- Updated dependencies [bbc8fb8]
  - @codeshift/cli@0.14.0

## 0.4.3

### Patch Changes

- Updated dependencies [72abeaa]
  - @codeshift/cli@0.13.0

## 0.4.2

### Patch Changes

- Updated dependencies [6e5fa3d]
  - @codeshift/test-utils@0.3.0

## 0.4.1

### Patch Changes

- 9c02149: Fixes test output template to ensure async methods are output
- Updated dependencies [9c02149]
  - @codeshift/utils@0.2.0

## 0.4.0

### Minor Changes

- 25164fe: Codemods are now output to the codemods/ directory instead of src/ to be more flexible when working with both isolated packages and pre-existing packages such as monorepos etc. Tooling should continue to work as expected regardless

### Patch Changes

- Updated dependencies [985c0e9]
- Updated dependencies [6d624ad]
  - @codeshift/cli@0.12.0

## 0.3.5

### Patch Changes

- Updated dependencies [1ffc6bf]
  - @codeshift/cli@0.11.4

## 0.3.4

### Patch Changes

- Updated dependencies [fb7c59a]
  - @codeshift/cli@0.11.3

## 0.3.3

### Patch Changes

- Updated dependencies [4d54ea0]
- Updated dependencies [60f1196]
  - @codeshift/cli@0.11.2

## 0.3.2

### Patch Changes

- @codeshift/cli@0.11.1

## 0.3.1

### Patch Changes

- Updated dependencies [c24d9e9]
  - @codeshift/cli@0.11.0

## 0.3.0

### Minor Changes

- 380ed84: Codeshift projects can now be initialized a config file only via the `init --config-only` command.

  Initialized projects now contain a README with helpful getting started information.

  The init command now outputs getting started tips + commands

### Patch Changes

- Updated dependencies [380ed84]
- Updated dependencies [1d034ab]
  - @codeshift/cli@0.10.0

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
