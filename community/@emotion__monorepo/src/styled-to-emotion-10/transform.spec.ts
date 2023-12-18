import { applyTransform } from '@hypermod/utils';
jest.autoMockOff();

import transformer from './transform';

describe('Transform import', () => {
  it('it transforms standard styled-component imports', async () => {
    const result = await applyTransform(
      transformer,
      "import styled from 'styled-components';",
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import styled from '@emotion/styled';"`,
    );
  });

  it('it ignores other imports', async () => {
    const result = await applyTransform(
      transformer,
      `
    import styled from 'styled-components';
    import react from 'react';
    `,
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import styled from '@emotion/styled';
          import react from 'react';"
    `);
  });

  it('it correctly detects misc core imports', async () => {
    const result = await applyTransform(
      transformer,
      "import { keyframes } from 'styled-components';",
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(
      `"import { keyframes } from '@emotion/core';"`,
    );
  });

  it('it correctly splits out core and styled imports', async () => {
    const result = await applyTransform(
      transformer,
      "import styled, { css } from 'styled-components';",
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import { css } from '@emotion/core';
      import styled from '@emotion/styled';"
    `);
  });

  it('it correctly splits out core and themed imports', async () => {
    const result = await applyTransform(
      transformer,
      "import styled, { ThemeProvider } from 'styled-components';",
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import styled from '@emotion/styled';
      import { ThemeProvider } from 'emotion-theming';"
    `);
  });

  it('it correctly splits out core and multiple themed imports', async () => {
    const result = await applyTransform(
      transformer,
      "import styled, { css, ThemeProvider, withTheme } from 'styled-components';",
      {
        parser: 'tsx',
      },
    );

    expect(result).toMatchInlineSnapshot(`
      "import { css } from '@emotion/core';
      import styled from '@emotion/styled';
      import { ThemeProvider, withTheme } from 'emotion-theming';"
    `);
  });
});
