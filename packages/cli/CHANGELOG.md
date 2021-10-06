# @codeshift/cli

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
