# add-react-import

Import React if it is missing from a file which uses JSX.

```jsx
/* INPUT */
export const Component = () => <div />

/* OUTPUT */
import React from "react";
export const Component = () => <div />
```
