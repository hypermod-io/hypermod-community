jest.autoMockOff();

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from './transform';

describe('Transform import', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    "import styled from 'styled-components';",
    "import styled from '@emotion/styled';",
    'it transforms standard styled-component imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
    import styled from 'styled-components';
    import react from 'react';
    `,
    `
    import styled from '@emotion/styled';
    import react from 'react';
    `,
    'it ignores other imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    "import { keyframes } from 'styled-components';",
    "import { keyframes } from '@emotion/core';",
    'it correctly detects misc core imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    "import styled, { css } from 'styled-components';",
    "import { css } from '@emotion/core';\nimport styled from '@emotion/styled';",
    'it correctly splits out core and styled imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    "import styled, { ThemeProvider } from 'styled-components';",
    `
    import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
    `,
    'it correctly splits out core and themed imports',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    "import styled, { css, ThemeProvider, withTheme } from 'styled-components';",
    `
    import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeProvider, withTheme } from 'emotion-theming';
    `,
    'it correctly splits out core and multiple themed imports',
  );
});
