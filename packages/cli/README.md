# @hypermod/cli

`@hypermod/cli` is the command-line interface for running codemods from local files, npm packages, the Hypermod community registry, and Hypermod.io-powered sources.

It builds on top of `jscodeshift` and adds workflow features needed for real package migrations:

- Run codemods from local transform files.
- Resolve codemods from npm packages and the community registry.
- Run versioned codemods in sequence.
- Run presets using the same package addressing format.
- Initialize and validate codemod packages.
- Use the same CLI surface for Hypermod.io-powered transforms.

> Codemods are designed to do the heavy lifting, but some manual review may still be required after running a migration.

## Install

Use `npx` for the latest version:

```bash
npx @hypermod/cli --help
```

Or install globally:

```bash
npm install -g @hypermod/cli
# or
yarn global add @hypermod/cli
```

## Usage

### Run a package migration

```bash
npx @hypermod/cli --packages react@18.0.0 ./src
```

### Run all transforms since a version

```bash
npx @hypermod/cli --sequence --packages @mylib/button@3.0.0 ./src
```

### Run a preset

```bash
npx @hypermod/cli --packages @mylib/button#remove-deprecated-props ./src
```

### Run a local transform

```bash
npx @hypermod/cli --transform ./codemods/rename-imports/transform.ts ./src
```

### List available codemods

```bash
npx @hypermod/cli list react @atlaskit/button
```

### Initialize a new codemod package

```bash
npx @hypermod/cli init --transform 1.0.0 my-codemod-package
```

### Validate a codemod package

```bash
npx @hypermod/cli validate ./community/my-package
```

## Learn more

- Product and docs: [hypermod.io/docs](https://www.hypermod.io/docs)
- Explore codemods: [hypermod.io/explore](https://www.hypermod.io/explore)
- Repository: [hypermod-community](https://github.com/hypermod-io/hypermod-community)
