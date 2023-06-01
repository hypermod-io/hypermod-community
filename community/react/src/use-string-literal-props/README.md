# use-string-literal-props

Convert JSX props which are expressions for a string literal, into just a string literal.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
const SomeComponent = () => (
  <AnotherComponent
    foo={'string'}
    label={`template with 0 substitutions`}
    whatever={`template with ${1} substitution`}
  />
);

/* OUTPUT */
const SomeComponent = () => (
  <AnotherComponent
    foo="string"
    label="template with 0 substitutions"
    whatever={`template with ${1} substitution`}
  />
);
```
