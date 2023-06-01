# javascript#remove-unused-vars

Codemods for javascript#remove-unused-vars

Detects and removes unused variables in JavaScript code.

_Credit:_ [https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables#readme)

```js
/* INPUT */
const x = 1;
const y = 2;
console.log(y);

/* OUTPUT */
const y = 2;
console.log(y);
```
