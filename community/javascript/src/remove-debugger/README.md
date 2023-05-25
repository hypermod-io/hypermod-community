# remove-debugger

Removes all `debugger` statements.

_Credit_: [https://github.com/JamieMason/codemods](https://github.com/JamieMason/codemods)

```js
/* INPUT */
console.log('hello world');
debugger;

/* OUTPUT */
console.log('hello world');
```
