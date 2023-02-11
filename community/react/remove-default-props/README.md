# remove-default-props

Remove use of React defaultProps.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
import React from 'react'

export const Greet = ({ name }) => <span>Hi {name}</span>
Greet.defaultProps = { name: 'Stranger' }

/* OUTPUT */
import React from 'react'

export const Greet = ({ name }) => <span>Hi {name}</span>
```
