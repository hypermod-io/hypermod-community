# add-react-import

Import React if it is missing from a file which uses JSX.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
export const Component = () => <div />

/* OUTPUT */
import React from "react";
export const Component = () => <div />
```
