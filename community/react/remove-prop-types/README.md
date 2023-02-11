# remove-prop-types

Remove use of React PropTypes.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
import React from 'react'
import PropTypes from 'prop-types'

export const Greet = ({ name }) => <span>Hi {name}</span>
Greet.propTypes = { name: PropTypes.string }

/* OUTPUT */
import React from 'react'

export const Greet = ({ name }) => <span>Hi {name}</span>
```
