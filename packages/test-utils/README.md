# @codeshift/test-utils

## `runTransform`

Accepts a transform and a code string and runs the transform against it.

Works well with Jest's `toMatchInlineSnapshot` and `toMatchSnapshot` assetions.

Example:

```ts
it('should wrap avatar in a tooltip', () => {
  const result = runTransform(
    transformer,
    `
      import Avatar from '@atlaskit/avatar';

      const App = () => {
        return <Avatar name="foo" />;
      }
    `,
    { parser: 'tsx' },
  );

  expect(result).toMatchInlineSnapshot(`
    "import Tooltip from '@atlaskit/tooltip';
      import Avatar from '@atlaskit/avatar';

      const App = () => {
        return <Tooltip content=\\"foo\\"><Avatar name=\\"foo\\" /></Tooltip>;
      }"
  `);
});
```
