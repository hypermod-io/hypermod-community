# CodeshiftCommunity

<p align="center">
  <img width="700" src="assets/github-banner.png" alt="CodeshiftCommunity Logo">
</p>

CodeshiftCommunity is a community-owned global registry and documentation hub for codemods. Providing library maintainers & users with facilities to help write, test, publish and consume codemods in a structured, standardized and familiar way.

_Inspired and built on Facebook's [jscodeshift](https://github.com/facebook/jscodeshift)_

[💬 Join our community on Discord](https://discord.gg/XGqmKNZ8Rk)

## Features

🔭 Explore an extensive list of codemods [contributed by the community](https://www.codeshiftcommunity.com/docs/registry).

✨ [Create](https://www.codeshiftcommunity.com/docs/authoring), [test](https://www.codeshiftcommunity.com/docs/testing) and [publish](https://www.codeshiftcommunity.com/docs/consuming) codemods from anywhere.

⚡️ Use our [helpers & testing utilities](https://www.codeshiftcommunity.com/docs/utils) to make writing codemods a breeze.

🧠 Up-skill your engineering team using our [guides & resources](https://www.codeshiftcommunity.com/docs/your-first-codemod).

🎨 Perfect for [Design Systems & Monorepos](https://www.codeshiftcommunity.com/docs/monorepos).

🦄 Bring your own [AST transformer](https://www.codeshiftcommunity.com/docs/css-codemods).

## Getting started

- [Writing codemods](https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/authoring)
- [Testing codemods](https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/testing)
- [Guides & learning resources](https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/your-first-codemod)
- [Publishing & contribution](https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/contribution)
- [Consuming codemods](https://codeshiftcommunity.github.io/CodeshiftCommunity/docs/consuming)

## Registry

[The registry](https://www.codeshiftcommunity.com/docs/registry) contains all community contributed codemods, hosted and published directly from the CodeshiftCommunity repository.

Source for these packages are located in the [/community folder](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community).

- [Registry homepage](https://www.codeshiftcommunity.com/docs/contribution)
- [Contributing to the registry](https://www.codeshiftcommunity.com/docs/contribution)
- [Registry source files](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community)

## CLI 

Downloading and running codemods as well as initialising and maintaining codemod packages can all be done via the Codeshift CLI (`@codeshift/cli`).

[Please see the docs for more information and examples](https://www.codeshiftcommunity.com/docs/cli)

We recommend running the CLI with $ npx to ensure you always have the latest version.

`$ npx @codeshift/cli --packages mylib@1.0.0 /project/src`

But it can also be installed globally:

`$ npm install -g @codeshift/cli or yarn global add @codeshift/cli`

and run with:

`$ codeshift or $ codeshift-cli`
