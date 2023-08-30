const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

import transformer from '../transform';

describe('@atlaskit/checkbox@12.0.0 transform', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
      import React from 'react';
      import { CheckboxWithoutAnalytics as Checkbox } from "@atlaskit/checkbox/Checkbox";

      const SimpleCheckbox = () => {
        return <Checkbox />;
      }
    `,
    `
      import React from 'react';
      import { Checkbox } from "@atlaskit/checkbox";

      const SimpleCheckbox = () => {
        return <Checkbox />;
      }
    `,
    'should replace import to CheckboxWithoutAnayltics with base import',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import { CheckboxProps } from "@atlaskit/checkbox/types";

        const SimpleCheckbox = () => {
          const props: CheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    `
        import React from 'react';
        import { Checkbox, CheckboxProps } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          const props: CheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    'should replace import into /types with base import',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import { CheckboxProps as AkCheckboxProps } from '@atlaskit/checkbox/dist/cjs/types';

        const SimpleCheckbox = () => {
          const props: AkCheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    `
        import React from 'react';
        import { Checkbox, CheckboxProps as AkCheckboxProps } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          const props: AkCheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    'should replace import into /dist/cjs/types with an alias with base import',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import { ComponentTokens, ThemeFn } from "@atlaskit/checkbox/types";

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    `
        /* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/checkbox which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the theming.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    'should replace import from /types that do not exist anymore',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import { ComponentTokens, ThemeFn, CheckboxProps as AkCheckboxProps } from "@atlaskit/checkbox/types";

        const SimpleCheckbox = () => {
          const props: AkCheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    `
        /* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/checkbox which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the theming.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox, CheckboxProps as AkCheckboxProps } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          const props: AkCheckboxProps = {
            value: 'hello',
          };
          return <Checkbox {...props} />;
        }
      `,
    'should replace import from /types that do not exist anymore',
  );
});

describe('Update ref prop', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React, { useRef } from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          const inputRef = (newRef) => {
            ref = newRef;
          }
          return <Checkbox inputRef={inputRef} />;
        }
      `,
    `
        import React, { useRef } from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          const inputRef = (newRef) => {
            ref = newRef;
          }
          return <Checkbox ref={inputRef} />;
        }
      `,
    'should replace inputRef with ref',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React, { useRef } from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          return (
            <Checkbox
              inputRef={newRef => {
                ref = newRef;
              }}
            />
          );
        }
      `,
    `
        import React, { useRef } from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          return (
            <Checkbox
              ref={newRef => {
                ref = newRef;
              }}
            />
          );
        }
      `,
    'should replace inputRef with ref when defined inline',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React, { useRef } from 'react';
        import { Checkbox as Foo } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          const inputRef = (newRef) => {
            ref = newRef;
          }
          return <Foo inputRef={inputRef} />;
        }
      `,
    `
        import React, { useRef } from 'react';
        import { Checkbox as Foo } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          let ref = useRef();

          const inputRef = (newRef) => {
            ref = newRef;
          }
          return <Foo ref={inputRef} />;
        }
      `,
    'should change inputRef with aliased import name',
  );
});

describe('Remove props', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          return <Checkbox isFullWidth={true} />;
        }
      `,
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    'should remove isFullWidth',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';

        const SimpleCheckbox = () => {
          return (
            <Checkbox
              overrides={{
                Icon: {
                  // Adding a custom Icon component
                  component: Icon,
                },
                IconIndeterminate: {
                  // Adding a custom Icon component for the indeterminate state
                  component: IconIndeterminate,
                },
              }}
            />
          );
        }
      `,
    `
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`overrides\` prop
        which has now been removed due to its poor performance characteristics. We have not
        replaced overrides with an equivalent API and the overrides pattern exposes internal
        implementation detail as public API and makes it harder for you to upgrade. The appearance
        of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    'should remove overrides and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return (
            <Checkbox
              theme={customTheme}
            />
          );
        }
      `,
    `
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`theme\` prop which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the \`theme\` prop. However if you
        were using theme to customise the size of the checkbox there is now a \`size\` prop.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    'should remove theme and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return (
            <Checkbox
              overrides={{
                Icon: {
                  // Adding a custom Icon component
                  component: Icon,
                },
                IconIndeterminate: {
                  // Adding a custom Icon component for the indeterminate state
                  component: IconIndeterminate,
                },
              }}
              theme={customeTheme}
              isFullWidth={true}
            />
          );
        }
      `,
    `
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`overrides\` prop
        which has now been removed due to its poor performance characteristics. We have not
        replaced overrides with an equivalent API and the overrides pattern exposes internal
        implementation detail as public API and makes it harder for you to upgrade. The appearance
        of Checkbox will have likely changed. */
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`theme\` prop which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the \`theme\` prop. However if you
        were using theme to customise the size of the checkbox there is now a \`size\` prop.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return <Checkbox />;
        }
      `,
    'should remove all 3 props and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
          import React from 'react';
          import { Checkbox } from "@atlaskit/checkbox";
          import { ComponentTokens, ThemeFn, CheckboxProps as AkCheckboxProps } from "@atlaskit/checkbox/types";
          import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
          import Icon from '@atlaskit/icon/glyph/check-circle';
          import customeTheme from './theme';

          const SimpleCheckbox = () => {
            return (
              <Checkbox
                overrides={{
                  Icon: {
                    // Adding a custom Icon component
                    component: Icon,
                  },
                  IconIndeterminate: {
                    // Adding a custom Icon component for the indeterminate state
                    component: IconIndeterminate,
                  },
                }}
                theme={customeTheme}
                isFullWidth={true}
              />
            );
          }
        `,
    `
          /* TODO: (@hypermod) This file uses exports used to help theme @atlaskit/checkbox which
          has now been removed due to its poor performance characteristics. We have not replaced
          theme with an equivalent API due to minimal usage of the theming.
          The appearance of Checkbox will have likely changed. */
          /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`overrides\` prop
          which has now been removed due to its poor performance characteristics. We have not
          replaced overrides with an equivalent API and the overrides pattern exposes internal
          implementation detail as public API and makes it harder for you to upgrade. The appearance
          of Checkbox will have likely changed. */
          /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`theme\` prop which
          has now been removed due to its poor performance characteristics. We have not replaced
          theme with an equivalent API due to minimal usage of the \`theme\` prop. However if you
          were using theme to customise the size of the checkbox there is now a \`size\` prop.
          The appearance of Checkbox will have likely changed. */
          import React from 'react';
          import { Checkbox, CheckboxProps as AkCheckboxProps } from "@atlaskit/checkbox";
          import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
          import Icon from '@atlaskit/icon/glyph/check-circle';
          import customeTheme from './theme';

          const SimpleCheckbox = () => {
            return <Checkbox />;
          }
        `,
    'should remove an old import, all 3 props and leave a comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return (
            <div>
              <Checkbox
                theme={customTheme}
              />
              <Checkbox
                theme={customTheme}
              />
            </div>
          );
        }
      `,
    `
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`theme\` prop which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the \`theme\` prop. However if you
        were using theme to customise the size of the checkbox there is now a \`size\` prop.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox } from "@atlaskit/checkbox";
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return (
            <div>
              <Checkbox />
              <Checkbox />
            </div>
          );
        }
      `,
    'should remove 2 usages of theme and add 1 comment',
  );
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
        import React from 'react';
        import { Checkbox as Foo } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return (
            <Foo
              overrides={{
                Icon: {
                  // Adding a custom Icon component
                  component: Icon,
                },
                IconIndeterminate: {
                  // Adding a custom Icon component for the indeterminate state
                  component: IconIndeterminate,
                },
              }}
              theme={customeTheme}
              isFullWidth={true}
            />
          );
        }
      `,
    `
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`overrides\` prop
        which has now been removed due to its poor performance characteristics. We have not
        replaced overrides with an equivalent API and the overrides pattern exposes internal
        implementation detail as public API and makes it harder for you to upgrade. The appearance
        of Checkbox will have likely changed. */
        /* TODO: (@hypermod) This file uses the @atlaskit/checkbox \`theme\` prop which
        has now been removed due to its poor performance characteristics. We have not replaced
        theme with an equivalent API due to minimal usage of the \`theme\` prop. However if you
        were using theme to customise the size of the checkbox there is now a \`size\` prop.
        The appearance of Checkbox will have likely changed. */
        import React from 'react';
        import { Checkbox as Foo } from "@atlaskit/checkbox";
        import IconIndeterminate from '@atlaskit/icon/glyph/add-circle';
        import Icon from '@atlaskit/icon/glyph/check-circle';
        import customeTheme from './theme';

        const SimpleCheckbox = () => {
          return <Foo />;
        }
      `,
    'should remove props when using an aliased name',
  );
});
