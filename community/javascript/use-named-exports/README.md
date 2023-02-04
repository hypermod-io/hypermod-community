# use-named-exports

Naively convert a default export to a named export using the name of the file,
which may clash with other variable names in the file. This codemod would need
following up on with ESLint and some manual fixes.

```js
/* INPUT */
// ~/Dev/repo/src/apps/health/server.js
export default mount("/health", app);

/* OUTPUT */
// ~/Dev/repo/src/apps/health/server.js
export const server = mount("/health", app);
```
