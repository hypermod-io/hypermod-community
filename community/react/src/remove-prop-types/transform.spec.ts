import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('react@#remove-prop-types transform', () => {
  it('should remove propTypes', async () => {
    const result = await applyTransform(
      transformer,
      `
import React from 'react'
import PropTypes from 'prop-types'

export const Greet = ({ name }) => <span>Hi {name}</span>
Greet.propTypes = { name: PropTypes.string }

      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      import React from 'react' export const Greet = ({ name }) =>
      <span>Hi {name}</span>
    `);
  });
});
