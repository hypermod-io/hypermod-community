# react#error-boundaries

Renames the experimental `unstable_handleError` lifecycle hook to `componentDidCatch`.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```js
/* INPUT */
import React from "react";

export class ComponentOne extends React.Component {
  unstable_handleError(error) {}
  render() {
    return <div />;
  }
}

/* OUTPUT */
import React from "react";

export class ComponentOne extends React.Component {
  componentDidCatch(error) {}
  render() {
    return <div />;
  }
}
```
