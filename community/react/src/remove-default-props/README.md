# remove-default-props

Remove use of React defaultProps.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
import React from 'react';

export const Greet = ({ name }) => <span>Hi {name}</span>;
Greet.defaultProps = { text: 'Stranger' };

/* OUTPUT */
import React from 'react';

export const Greet = ({ name, text = 'Stranger' }) => <span>Hi {name}</span>;
```

```jsx
/* INPUT */
import React from 'react';

export const Greet = (props) => <span>Hi {name}</span>;
Greet.defaultProps = { text: 'Stranger' };

/* OUTPUT */
import React from 'react';

export const Greet = ({ ...props, text = 'Stranger' }) => <span>Hi {name}</span>;
```