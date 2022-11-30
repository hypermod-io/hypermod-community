# @codeshift/cli

To download and run codemods, we provide a CLI tool called @codeshift/cli.

`@codeshift/cli` is responsible for running the provided transform against your entire codebase. Under the hood, it is a wrapper of jscodeshift's CLI, which provides additional functionality.

Ability to run community codemods hosted on npm
Runs versioned codemods in sequence
Always runs the latest version of a codemod
The CLI allows you to run transforms either from the the [public registry](https://www.codeshiftcommunity.com/docs/registry) or on your local machine as per the original implementation of jscodeshift

_Note:_ Codemods are designed to do the heavy lifting, but they may not be perfect, so some manual work may still be required in order to successfully migrate.

[Documentation](https://www.codeshiftcommunity.com/docs/cli)
