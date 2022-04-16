jest.autoMockOff();

import { applyTransform } from '@codeshift/test-utils';
import * as transformer from '../transform';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Update Avatar props', () => {
  it('should wrap avatar in a tooltip if name is defined', async () => {
    const result = await applyTransform(
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

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const name = 'foo';

        const App = () => {
          return <Avatar name={name} />;
        }
      `,
    `
        import Tooltip from '@atlaskit/tooltip';
        import Avatar from '@atlaskit/avatar';

        const name = 'foo';

        const App = () => {
          return <Tooltip content={name}><Avatar name={name} /></Tooltip>;
        }
      `,
    'should wrap avatar in a tooltip if name is defined as a variable',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar name="foo" enableTooltip={true} />;
        }
      `,
    `
        import Tooltip from '@atlaskit/tooltip';
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Tooltip content="foo"><Avatar name="foo" /></Tooltip>;
        }
      `,
    'should wrap avatar in a tooltip if name and enableTooltip are provided',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const value = true;

        const App = () => {
          return <Avatar name="foo" enableTooltip={value} />;
        }
      `,
    `
        import Tooltip from '@atlaskit/tooltip';
        import Avatar from '@atlaskit/avatar';

        const value = true;

        const App = () => {
          return value ? <Tooltip content="foo"><Avatar name="foo" /></Tooltip> : <Avatar name="foo" />;
        }
      `,
    'should conditionally wrap avatar in toolip if an expression is passed to enableTooltip',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar name="Foo" enableTooltip={false} />;
        }
      `,
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar name="Foo" />;
        }
      `,
    'should not wrap avatar in a tooltip if name is defined and enableTooltip is false',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return (
            <Avatar
              isHover={true}
              isActive={true}
              isFocus={true}
              isSelected={true}
              theme={{}}
            />
          )
        }
      `,
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar />;
        }
      `,
    'should remove all deleted props',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Foo from '@atlaskit/avatar';

        const App = () => {
          return (
            <Foo
              isHover={true}
              isActive={true}
              isFocus={true}
              isSelected={true}
              theme={{}}
            />
          )
        }
      `,
    `
        import Foo from '@atlaskit/avatar';

        const App = () => {
          return <Foo />;
        }
      `,
    'should remove all deleted props with aliased import name',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return (
            <Avatar
              enableTooltip={false}
            />
          )
        }
      `,
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar />;
        }
      `,
    'should remove enableTooltip when false',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        const App = () => {
          return (
            <Avatar
              isHover={true}
              isActive={true}
              isFocus={true}
              isSelected={true}
              enableTooltip={true}
            />
          )
        }
      `,
    `
        const App = () => {
          return (
            <Avatar
              isHover={true}
              isActive={true}
              isFocus={true}
              isSelected={true}
              enableTooltip={true}
            />
          )
        }
      `,
    'should not mutate JSX if import is missing',
  );
});

describe('Update AvatarItem props', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar, { AvatarItem } from '@atlaskit/avatar';

        const App = () => {
          return (
            <AvatarItem
              isHover={true}
              isActive={true}
              isFocus={true}
              isSelected={true}
              theme={{}}
            />
          )
        }
      `,
    `
        import Avatar, { AvatarItem } from '@atlaskit/avatar';

        const App = () => {
          return <AvatarItem />;
        }
      `,
    'should remove all deleted props',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { AvatarItem as Foo } from '@atlaskit/avatar';

      const App = () => {
        return (
          <Foo
            isHover={true}
            isActive={true}
            isFocus={true}
            isSelected={true}
            theme={{}}
          />
        )
      }
    `,
    `
      import { AvatarItem as Foo } from '@atlaskit/avatar';

      const App = () => {
        return <Foo />;
      }
    `,
    'should remove all deleted props with aliased import',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
    import { AvatarItem } from '@atlaskit/avatar';

    const App = () => {
      return (
        <AvatarItem
          enableTextTruncate
        />
      );
    }
  `,
    `
    import { AvatarItem } from '@atlaskit/avatar';

    const App = () => {
      return <AvatarItem />;
    }
  `,
    'should remove enableTextTruncate when defaulted to true',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const App = () => {
        return (
          <AvatarItem
            enableTextTruncate={false}
          />
        )
      }
    `,
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const App = () => {
        return (
          <AvatarItem
            isTruncationDisabled
          />
        );
      }
    `,
    'should rename isTruncationDisabled when false',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const value = true;

      const App = () => {
        return (
          <AvatarItem
            enableTextTruncate={value}
          />
        );
      }
    `,
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const value = true;

      const App = () => {
        return (
          <AvatarItem
            isTruncationDisabled={!value}
          />
        );
      }
    `,
    'should rename isTruncationDisabled and negate non-boolean values',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const foo = 'foo';
      const bar = 'bar';

      const App = () => {
        return (
          <AvatarItem
            enableTextTruncate={foo && bar}
          />
        );
      }
    `,
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const foo = 'foo';
      const bar = 'bar';

      const App = () => {
        return (
          <AvatarItem
            isTruncationDisabled={!(foo && bar)}
          />
        );
      }
    `,
    'should rename isTruncationDisabled and negate non-boolean values',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const App = () => {
        return (
          <AvatarItem
            enableTextTruncate={true}
          />
        )
      }
    `,
    `
      import Avatar, { AvatarItem } from '@atlaskit/avatar';

      const App = () => {
        return <AvatarItem />;
      }
    `,
    'should remove isTruncationDisabled when true',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      const App = () => {
        return (
          <AvatarItem
            isHover={true}
            isActive={true}
            isFocus={true}
            isSelected={true}
            enableTextTruncate={true}
          />
        )
      }
    `,
    `
      const App = () => {
        return (
          <AvatarItem
            isHover={true}
            isActive={true}
            isFocus={true}
            isSelected={true}
            enableTextTruncate={true}
          />
        )
      }
    `,
    'should not mutate JSX if import is missing',
  );
});

describe('Update BORDER_WIDTH usage', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { BORDER_WIDTH } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH['foo'];
    `,
    `
      import { BORDER_WIDTH } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH;
    `,
    'should update square bracket notation usages',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import { BORDER_WIDTH } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH.medium;
    `,
    `
      import { BORDER_WIDTH } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH;
    `,
    'should update dot notation usages',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
      import Avatar, { BORDER_WIDTH, AvatarItem } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH['foo'];
    `,
    `
      import Avatar, { BORDER_WIDTH, AvatarItem } from '@atlaskit/avatar';

      var borderWidth = BORDER_WIDTH;
    `,
    'should update usages with multiple imports',
  );
});
