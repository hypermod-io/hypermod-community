# <% packageName %>

This project was bootstrapped with [Hypermod 🚚](https://www.hypermod.io/). Please see the [Hypermod docs](https://www.hypermod.io/docs) for more information on how to work with this repo.

![Hypermod logo](https://www.hypermod.io/img/logo.svg)

## Scripts

### `npm run dev`

Runs the Hypermod CLI useful for testing transform files as if they have been published

**example:** `npm run dev -t codemods/10.0.0/transform.ts`

Alternatively, you can run `npm run dev` to see an interactive list of codemods to choose from.

See the [CLI docs](https://www.hypermod.io/docs) for more information.

### `npm run test`

Launches the test runner in interactive watch mode.

See the [testing guide](https://www.hypermod.io/docs) for more information.

### `npm run validate`

Checks the validity of your `hypermod.config.js` file.

See the [configuration docs](https://www.hypermod.io/docs) for more information.

### `npm run build`

Builds the app for production to the `dist` folder.

## Publishing

This package can be published to npm via the normal commands `npm version` and `npm publish`

## Build tooling

Feel free to replace the preinstalled build tooling & dependencies to suit your needs. The only requirement is that there is a valid `hypermod.config.js` in your project root, `/src` or `/codemods` directories.
