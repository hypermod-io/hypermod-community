import { API, FileInfo } from 'jscodeshift';
import { applyTransform } from '@codeshift/test-utils';
import { isDecendantOfType } from '@codeshift/utils';

describe('nodes', () => {
  describe('isDecendantOfType', () => {
    it('detects decendant callExpression', async () => {
      let result = 0;
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;

        result = j(file.source)
          .find(j.Literal)
          .filter(literal =>
            isDecendantOfType(j, literal, j.CallExpression),
          ).length;
      };

      await applyTransform(transform, 'console.log("bar");');

      expect(result).toEqual(1);
    });

    it('correctly reports missing decendant', async () => {
      let result = 0;
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;

        result = j(file.source)
          .find(j.Literal)
          .filter(literal =>
            isDecendantOfType(j, literal, j.CallExpression),
          ).length;
      };

      await applyTransform(transform, 'const foo = "bar";');

      expect(result).toEqual(0);
    });

    it('correctly reports deeply nested decendant', async () => {
      let result = 0;
      const transform = (file: FileInfo, api: API) => {
        const j = api.jscodeshift;

        result = j(file.source)
          .find(j.Literal)
          .filter(literal =>
            isDecendantOfType(j, literal, j.CallExpression),
          ).length;
      };

      await applyTransform(transform, 'console.log(console.log("bar"));');

      expect(result).toEqual(1);
    });
  });
});
