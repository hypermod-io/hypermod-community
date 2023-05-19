import { API, FileInfo } from 'jscodeshift';
import { applyTransform } from '@codeshift/test-utils';
import * as importUtils from './imports';

describe('imports', () => {
  describe('insertImportSpecifier', () => {
    it('inserts import specifier to existing import', async () => {
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;
        const source = j(file.source);
        importUtils.insertImportSpecifier(
          j,
          source,
          j.importSpecifier(j.identifier('bar')),
          'bar',
        );

        return source.toSource();
      };
      const result = await applyTransform(
        transform,
        `import { foo } from 'bar';`,
      );
      expect(result).toMatchInlineSnapshot(`"import { foo, bar } from 'bar';"`);
    });

    it('inserts import specifier to empty import', async () => {
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;
        const source = j(file.source);
        importUtils.insertImportSpecifier(
          j,
          source,
          j.importSpecifier(j.identifier('bar')),
          'bar',
        );

        return source.toSource();
      };
      const result = await applyTransform(transform, `import { } from 'bar';`);
      expect(result).toMatchInlineSnapshot(`"import { bar } from 'bar';"`);
    });

    it('does not insert an import specifier if already exists', async () => {
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;
        const source = j(file.source);
        importUtils.insertImportSpecifier(
          j,
          source,
          j.importSpecifier(j.identifier('bar')),
          'bar',
        );

        return source.toSource();
      };
      const result = await applyTransform(
        transform,
        `import { bar } from 'bar';`,
      );
      expect(result).toMatchInlineSnapshot(`"import { bar } from 'bar';"`);
    });

    it('maintains a reference to importDec and is able to inserts import specifier', async () => {
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;
        const source = j(file.source);

        importUtils
          .getImportDeclaration(j, source, '@foo/myModule')
          .find(j.ImportSpecifier)
          .filter(specifier => specifier.value.imported.name === 'bar')
          .forEach(() => {
            importUtils.insertImportSpecifier(
              j,
              source,
              j.importSpecifier(j.identifier('foo')),
              '@foo/myModule',
            );
          })
          .remove();
        return source.toSource();
      };
      const result = await applyTransform(
        transform,
        `import { bar } from '@foo/myModule';`,
      );
      expect(result).toMatchInlineSnapshot(
        `"import { foo } from '@foo/myModule';"`,
      );
    });
  });
});

// const result = applyTransform(
//   codemod,
//   `import { elevation as AkElevations, colors } from '@atlaskit/theme';

// export const Unlinked = styled.span\`color: \${colors.N800};\`;

// export const Card = styled.div\`
//   position: absolute;
//   \${props => (props.isElevated ? AkElevations.e300 : AkElevations.e100)};
// \`;
// `,
// );
