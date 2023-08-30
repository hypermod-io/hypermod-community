import { applyTransform } from '@hypermod/utils';
import * as transformer from './transform';

describe('react#rename-unsafe-lifecycles transform', () => {
  it('should transform correctly', async () => {
    const result = await applyTransform(
      transformer,
      `
class ExampleComponent extends React.Component {
  componentWillMount() { }
  componentWillUpdate(nextProps, nextState) { }
  componentWillReceiveProps(nextProps) { }
}
      `,
      { parser: 'tsx' },
    );

    expect(result).toMatchInlineSnapshot(`
      "class ExampleComponent extends React.Component {
        UNSAFE_componentWillMount() { }
        UNSAFE_componentWillUpdate(nextProps, nextState) { }
        UNSAFE_componentWillReceiveProps(nextProps) { }
      }"
    `);
  });
});
