jest.mock('globby');

import globby from 'globby';
import path from 'path';
import { PluginManager } from 'live-plugin-manager';

import { fetchConfig, fetchPackage, fetchRemotePackage } from '.';

const mockBasePath = path.join(__dirname, 'path', 'to');

const mockConfig = {
  transforms: {
    '10.0.0': 'path/to/transform.js',
  },
};

describe('fetcher', () => {
  let mockMatchedPaths: string[] = [];

  beforeEach(() => {
    mockMatchedPaths = [
      path.join(mockBasePath, 'codeshift.config.js'),
      path.join(mockBasePath, 'src', 'codeshift.config.ts'),
      path.join(mockBasePath, 'codemods', 'codeshift.config.tsx'),
    ];

    ((globby as unknown) as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockMatchedPaths),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchConfig', () => {
    it('fetches config with default export', async () => {
      jest.mock(
        `${__dirname}/path/to/codeshift.config.js`,
        () => ({
          __esModule: true,
          default: mockConfig,
        }),
        { virtual: true },
      );

      const config = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
    });

    it('fetches config with named export', async () => {
      jest.mock(`${__dirname}/path/to/codeshift.config.js`, () => mockConfig, {
        virtual: true,
      });

      const config = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
    });

    it('fetches first matched config when multiple are found', async () => {
      jest.mock(
        `${__dirname}/path/to/src/codeshift.config.ts`,
        () => ({
          __esModule: true,
          default: mockConfig,
        }),
        { virtual: true },
      );

      mockMatchedPaths = [
        path.join(mockBasePath, 'src', 'codeshift.config.ts'),
        path.join(mockBasePath, 'codemods', 'codeshift.config.tsx'),
      ];

      const config = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
    });

    it('returns undefined if no config was found', async () => {
      mockMatchedPaths = [];

      const config = await fetchConfig(mockBasePath);

      expect(config).toBe(undefined);
    });
  });

  describe('fetchPackage', () => {
    it('correctly fetches package and returns a config', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        require: jest.fn().mockReturnValue(mockConfig),
      };

      const config = await fetchPackage(
        'fake-package',
        (mockPackageManager as unknown) as PluginManager,
      );

      expect(config).toEqual(mockConfig);
    });

    it('should throw if fetching fails', async () => {
      const mockPackageManager = {
        install: jest.fn().mockRejectedValue('Import error'),
        require: jest.fn().mockReturnValue(mockConfig),
      };

      expect.assertions(1);

      await expect(
        fetchPackage(
          'fake-package',
          (mockPackageManager as unknown) as PluginManager,
        ),
      ).rejects.toEqual('Import error');
    });
  });

  describe('fetchRemotePackage', () => {
    it('correctly fetches package and returns a config', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        getInfo: jest.fn().mockReturnValue({
          location: mockBasePath,
        }),
      };

      const config = await fetchRemotePackage(
        'fake-package',
        (mockPackageManager as unknown) as PluginManager,
      );

      expect(config).toEqual(mockConfig);
    });

    it('should throw if fetching fails', async () => {
      const mockPackageManager = {
        install: jest.fn().mockRejectedValue('Import error'),
      };

      expect.assertions(1);

      await expect(
        fetchRemotePackage(
          'fake-package',
          (mockPackageManager as unknown) as PluginManager,
        ),
      ).rejects.toEqual('Import error');
    });

    it('should throw if package source cannot be retrieved', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        getInfo: () => undefined,
      };

      expect.assertions(1);

      await expect(
        fetchRemotePackage(
          'fake-package',
          (mockPackageManager as unknown) as PluginManager,
        ),
      ).rejects.toEqual(
        Error(`Unable to locate package files for package: 'fake-package'`),
      );
    });
  });
});
