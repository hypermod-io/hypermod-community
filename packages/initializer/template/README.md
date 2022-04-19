# <% packageName %>

This project was bootstrapped with [CodeshiftCommunity 🚚](https://www.codeshiftcommunity.com/). Please see the [external packages guide](https://www.codeshiftcommunity.com/docs/external-packages) for more information on how to work with this repo.

![CodeshiftCommunity logo](https://www.codeshiftcommunity.com/img/logo.svg)

## Scripts

### `npm run dev`

Runs the codeshift CLI useful for testing transform files as if they have been published

**example:** `npm run dev -t src/10.0.0/transform.ts`

See the [cli reference](https://www.codeshiftcommunity.com/docs/cli) for more information.

### `npm run test`

Launches the test runner in interactive watch mode.

See the [testing guide](https://www.codeshiftcommunity.com/docs/testing) for more information.

### `npm run validate`

Checks the validity of your `codeshift.config.js` file.

See the [configuration options](https://www.codeshiftcommunity.com/docs/configuration) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.

## Publishing

This package can be published to npm via the normal commands `npm version` and `npm publish`

## Build tooling

Feel free to replace the preinstalled build tooling & dependencies to suit your needs. The only requirement is that there is a valid `codeshift.config.js` in your project root, `/src` or `/codemods` directories.
