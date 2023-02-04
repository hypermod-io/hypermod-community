# react#rename-unsafe-lifecycles

Adds `UNSAFE_` prefix for deprecated lifecycle hooks. (For more information about this codemod, see [React RFC #6](https://github.com/reactjs/rfcs/pull/6))

```js
/* INPUT */
class ExampleComponent extends React.Component {
  componentWillMount() { }
  componentWillUpdate(nextProps, nextState) { }
  componentWillReceiveProps(nextProps) { }
}

/* OUTPUT */
class ExampleComponent extends React.Component {
  UNSAFE_componentWillMount() { }
  UNSAFE_componentWillUpdate(nextProps, nextState) { }
  UNSAFE_componentWillReceiveProps(nextProps) { }
}
```
