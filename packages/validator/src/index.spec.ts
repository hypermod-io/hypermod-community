jest.mock('fs-extra');
jest.mock('@hypermod/fetcher');

import { fetchConfig } from '@hypermod/fetcher';

import { isValidPackageName, isValidConfig, isValidConfigAtPath } from '.';

describe('validator', () => {
  describe('isValidPackageName', () => {
    it('should detect a valid package name', () => {
      expect(isValidPackageName('foobar')).toEqual(true);
      expect(isValidPackageName('123123')).toEqual(true);
      expect(isValidPackageName('yo~')).toEqual(true);
      expect(isValidPackageName('yo-')).toEqual(true);
      expect(isValidPackageName('@foo__bar')).toEqual(true);
      expect(isValidPackageName('@foo__bar1111')).toEqual(true);
      expect(isValidPackageName('@foo11__bar1111')).toEqual(true);
    });

    it('should detect a invalid package names', () => {
      expect(isValidPackageName('foo bar')).toEqual(false);
      expect(isValidPackageName('#foo#')).toEqual(false);
      expect(isValidPackageName('@foo/bar')).toEqual(false);
      expect(isValidPackageName('@foo/bar1111')).toEqual(false);
      expect(isValidPackageName('@foo11/bar1111')).toEqual(false);
    });
  });

  describe('isValidConfig', () => {
    it('should validate config with transforms & presets', () => {
      expect(
        isValidConfig({
          transforms: {
            '10.0.0': 'codemod.js',
          },
          presets: {
            'sort-imports': 'codemod.js',
          },
        }),
      ).toEqual(true);
    });

    it('should validate config with empty transforms & presets', () => {
      expect(
        isValidConfig({
          transforms: {},
          presets: {},
        }),
      ).toEqual(true);

      expect(isValidConfig({ transforms: {} })).toEqual(true);
      expect(isValidConfig({ presets: {} })).toEqual(true);
    });

    it('should validate config transforms', () => {
      expect(
        isValidConfig({
          transforms: {
            '10.0.0': 'codemod.js',
            '11.0.0': 'codemod.js',
            '0.0.1': 'codemod.js',
            '1110.0.1': 'codemod.js',
          },
        }),
      ).toEqual(true);

      expect(
        isValidConfig({
          transforms: {
            '10.0': 'codemod.js',
          },
        }),
      ).toEqual(false);

      expect(
        isValidConfig({
          transforms: {
            'hello-10.0.0': 'codemod.js',
          },
        }),
      ).toEqual(false);
    });

    it('should validate config presets', () => {
      expect(
        isValidConfig({
          presets: {
            foobar: 'codemod.js',
            'foo-bar': 'codemod.js',
          },
        }),
      ).toEqual(true);

      expect(
        isValidConfig({
          presets: {
            'foo bar': 'codemod.js',
          },
        }),
      ).toEqual(false);
    });
  });

  describe('isValidConfigAtPath', () => {
    afterEach(() => {
      jest.restoreAllMocks();
      jest.resetModules();
    });

    it('should validate config', async () => {
      (fetchConfig as jest.Mock).mockResolvedValue({
        location: 'path/to/hypermod.config.js',
        config: {
          transforms: {
            '10.0.0': jest.fn(),
          },
        },
      });

      const result = await isValidConfigAtPath('path/to/');
      expect(result).toEqual(true);
    });

    it('should error if config contains an invalid property', async () => {
      (fetchConfig as jest.Mock).mockResolvedValue({
        location: 'path/to/hypermod.config.js',
        config: {
          invalidProperty: 'foo',
        },
      });

      await expect(isValidConfigAtPath('path/to/')).rejects.toThrowError(
        `Invalid transform ids found: invalidProperty`,
      );
    });

    it('should error if config contains multiple invalid properties', async () => {
      (fetchConfig as jest.Mock).mockResolvedValue({
        location: 'path/to/hypermod.config.js',
        config: {
          invalidProperty: 'foo',
          invalidProperty2: 'foo',
          invalidProperty3: 'foo',
        },
      });

      await expect(isValidConfigAtPath('path/to/')).rejects.toThrowError(
        `Invalid transform ids found: invalidProperty, invalidProperty2, invalidProperty3`,
      );
    });

    it('should error if config contains invalid transforms', async () => {
      (fetchConfig as jest.Mock).mockResolvedValue({
        location: 'path/to/hypermod.config.js',
        config: {
          transforms: {
            hello: '',
          },
        },
      });

      await expect(isValidConfigAtPath('path/to/')).rejects.toThrowError(
        `Invalid transform ids found for config at "path/to/".
Please make sure all transforms are identified by a valid semver version. ie 10.0.0`,
      );
    });

    it('should error if config contains invalid presets', async () => {
      (fetchConfig as jest.Mock).mockResolvedValue({
        location: 'path/to/hypermod.config.js',
        config: {
          presets: {
            'foo bar': '',
          },
        },
      });

      await expect(isValidConfigAtPath('path/to/')).rejects.toThrowError(
        `Invalid preset ids found for config at "path/to/".
Please make sure all presets are kebab case and contain no spaces or special characters. ie sort-imports-by-scope`,
      );
    });
  });
});
