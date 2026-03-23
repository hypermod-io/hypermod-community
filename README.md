<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/hypermod-io/hypermod-community/assets/3030010/f4ec415a-b320-4949-b352-0be9b1666f97">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/hypermod-io/hypermod-community/assets/3030010/9deed89f-1b24-4914-8007-74551abf40b2">
  <img alt="Hypermod community repository banner" src="https://github.com/hypermod-io/hypermod-community/assets/3030010/9deed89f-1b24-4914-8007-74551abf40b2">
</picture>

# Hypermod Community

Hypermod Community is the open-source codemod registry and CLI ecosystem for [Hypermod.io](https://www.hypermod.io/).
Use this repository to discover, author, test, publish, and contribute codemods; use Hypermod.io to explore codemods, learn migration workflows, and promote safer package upgrades at scale.

[Explore Hypermod.io](https://www.hypermod.io/) •
[Browse codemods](https://www.hypermod.io/explore) •
[Read the docs](https://www.hypermod.io/docs) •
[Join Discord](https://discord.gg/XGqmKNZ8Rk)

## Why this project exists

Upgrading dependencies is expensive when maintainers only ship changelogs and users are left to translate breaking changes by hand.
Hypermod helps library maintainers, platform teams, design-system teams, and migration owners turn breaking API changes into repeatable codemods that can be shared with the wider ecosystem.

This repository is the community-facing home for that workflow:

- **Community codemod registry** for versioned and reusable codemods.
- **CLI packages** for running codemods locally, from npm, or from Hypermod.io-hosted sources.
- **Authoring utilities** for creating, validating, and testing codemod packages.
- **Examples and templates** that make it easier to ship migrations users can actually adopt.

## How Hypermod Community and Hypermod.io fit together

- **Hypermod.io** is the product and discovery layer: explore codemods, learn workflows, and access hosted Hypermod experiences.
- **`@hypermod/cli`** is the command-line entry point for running codemods in local projects, from npm packages, and from Hypermod.io-powered sources.
- **This repository** is the open-source registry, package monorepo, and contribution surface behind the ecosystem.

## Get started with the CLI

We recommend using the CLI with `npx` so you always run the latest version:

```bash
npx @hypermod/cli --packages react@18.0.0 ./src
```

You can also install it globally:

```bash
npm install -g @hypermod/cli
# or
yarn global add @hypermod/cli
```

Then run it with either binary:

```bash
hypermod --help
# or
hypermod-cli --help
```

### Common usage examples

#### Run a package migration from npm/community codemods

```bash
npx @hypermod/cli --packages @atlaskit/button@3.0.0 ./src
```

#### Run all transforms from a version to latest

```bash
npx @hypermod/cli --sequence --packages @mylib/button@3.0.0 ./src
```

#### Run a preset

```bash
npx @hypermod/cli --packages @mylib/button#remove-deprecated-props ./src
```

#### Run a local transform file

```bash
npx @hypermod/cli --transform ./codemods/rename-imports/transform.ts ./src
```

#### Browse available codemods for packages

```bash
npx @hypermod/cli list react @atlaskit/button
```

#### Initialize a new codemod package

```bash
npx @hypermod/cli init --transform 1.0.0 my-codemod-package
```

#### Validate a codemod package

```bash
npx @hypermod/cli validate ./community/my-package
```

## What the CLI supports

`@hypermod/cli` is built for real migration workflows, not just one-off transforms.

- Run codemods from **local transform files**.
- Resolve codemods from **npm packages** and the **community registry**.
- Run **versioned transforms in sequence** for safer upgrades.
- Run **presets** for utility codemods that are not tied to a semver milestone.
- Initialize and validate codemod packages for maintainers and contributors.
- Access Hypermod.io-powered transform sources through the same CLI surface.

For the latest product docs and guides, visit [hypermod.io/docs](https://www.hypermod.io/docs).

## Who this is for

- **Library maintainers** who want to ship upgrades users can actually adopt.
- **Platform and infra teams** performing large-scale migrations across many repositories.
- **Design-system teams** managing frequent component API changes.
- **Application teams** that want safer, faster JavaScript and TypeScript refactors.

## Contributing codemods

Community codemods live in the [`community/`](./community) directory and are published as packages that can be discovered and run through the Hypermod ecosystem.

Useful starting points:

- Browse the community packages in [`community/`](./community)
- Inspect the CLI in [`packages/cli`](./packages/cli)
- Use the package template in [`packages/initializer/template`](./packages/initializer/template)
- Explore product docs on [Hypermod.io](https://www.hypermod.io/docs)

## Used by

- [Algolia](https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/react/)
- [Compiled CSS-in-JS](https://github.com/atlassian-labs/compiled/tree/master/packages/codemods)
- [react-resource-router](https://github.com/atlassian-labs/react-resource-router/tree/master/codemods)
- [Webdriver.io](https://github.com/webdriverio/codemod)

## Sponsors

Huge thanks for all of the support from our sponsors!

<p>
    <a href="https://github.com/omeraplak"
    ><img
            src="https://avatars.githubusercontent.com/u/1110414?v=4"
            width="40"
            height="40"
            alt="@omeraplak"
    /></a>
    <a href="https://github.com/necatiozmen"
    ><img
            src="https://avatars.githubusercontent.com/u/18739364?v=4"
            width="40"
            height="40"
            alt="@necatiozmen"
    /></a>
    <a href="https://github.com/preciselyalyss"
    ><img
            src="https://avatars1.githubusercontent.com/u/9373485?s=60&amp;v=4"
            width="40"
            height="40"
            alt="@PreciselyAlyss"
    /></a>
    <a href="https://github.com/preciselyalyss"
    ><img
            src="https://avatars.githubusercontent.com/u/1734502?s=70&v=4"
            width="40"
            height="40"
            alt="@PreciselyAlyss"
    /></a>
 </p>
