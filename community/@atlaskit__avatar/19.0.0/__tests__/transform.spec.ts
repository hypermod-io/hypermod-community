import * as transformer from '../transform';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Update Avatar to use render props', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return <Avatar name="MCB" component={CustomAvatar} />;
        }
      `,
    `
        import Avatar from '@atlaskit/avatar';

        const App = () => {
          return (
            <Avatar name="MCB">{(
                {
                  ref: _,
                  ...props
                }
              ) => <CustomAvatar {...props} />}</Avatar>
          );
        }
      `,
    'should wrap custom component in render prop',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import Foo from '@atlaskit/avatar';

        const App = () => {
          return <Foo component={CustomAvatarItem} />;
        }
      `,
    `
        import Foo from '@atlaskit/avatar';

        const App = () => {
          return (
            <Foo>{(
                {
                  ref: _,
                  ...props
                }
              ) => <CustomAvatarItem {...props} />}</Foo>
          );
        }
      `,
    'should convert aliased Avatar component prop to render prop',
  );
});

describe('Update AvatarItem to use render props', () => {
  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import { AvatarItem } from '@atlaskit/avatar';

        const App = () => {
          return <AvatarItem component={CustomAvatarItem} />;
        }
      `,
    `
        import { AvatarItem } from '@atlaskit/avatar';

        const App = () => {
          return (
            <AvatarItem>{(
                {
                  ref: _,
                  ...props
                }
              ) => <CustomAvatarItem {...props} />}</AvatarItem>
          );
        }
      `,
    'should wrap custom component in render prop',
  );

  defineInlineTest(
    { ...transformer, parser: 'tsx' },
    {},
    `
        import { AvatarItem as Foo } from '@atlaskit/avatar';

        const App = () => {
          return <Foo component={CustomAvatarItem} />;
        }
      `,
    `
        import { AvatarItem as Foo } from '@atlaskit/avatar';

        const App = () => {
          return (
            <Foo>{(
                {
                  ref: _,
                  ...props
                }
              ) => <CustomAvatarItem {...props} />}</Foo>
          );
        }
      `,
    'should convert aliased AvatarItem component prop to render prop',
  );
});
