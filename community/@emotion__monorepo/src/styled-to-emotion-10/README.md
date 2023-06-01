# styled-to-emotion

Automatically migrates from styled-components to emotion v10

```jsx
/* INPUT */
import styled, { css, ThemeProvider, withTheme } from 'styled-components';

/* OUTPUT */
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider, withTheme } from 'emotion-theming';
```
