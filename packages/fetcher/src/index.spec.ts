jest.mock('globby');

import fs from 'fs';
import path from 'path';
import globby from 'globby';
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
    mockMatchedPaths = [path.join(mockBasePath, 'hypermod.config.js')];

    (globby as unknown as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockMatchedPaths),
    );

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchConfig', () => {
    it('fetches config with default export', async () => {
      const mockFilePath = `${__dirname}/path/to/hypermod.config.js`;

      jest.mock(
        `${__dirname}/path/to/hypermod.config.js`,
        () => ({ __esModule: true, default: mockConfig }),
        { virtual: true },
      );

      const { filePath, config } = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(mockFilePath);
    });

    it('fetches config with named export', async () => {
      jest.mock(
        path.join(mockBasePath, 'hypermod.config.js'),
        () => mockConfig,
        {
          virtual: true,
        },
      );

      const { filePath, config } = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(path.join(mockBasePath, 'hypermod.config.js'));
    });

    it('fetches first matched config when multiple are found', async () => {
      jest.mock(
        `${__dirname}/path/to/src/hypermod.config.ts`,
        () => ({ __esModule: true, default: mockConfig }),
        { virtual: true },
      );

      jest.mock(
        `${__dirname}/path/to/codemods/hypermod.config.tsx`,
        () => ({ __esModule: true, default: mockConfig }),
        { virtual: true },
      );

      mockMatchedPaths = [
        path.join(mockBasePath, 'src', 'hypermod.config.ts'),
        path.join(mockBasePath, 'codemods', 'hypermod.config.tsx'),
      ];

      const { config, filePath } = await fetchConfig(mockBasePath);

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(
        path.join(mockBasePath, 'src', 'hypermod.config.ts'),
      );
    });

    it('returns undefined if no config was found', async () => {
      mockMatchedPaths = [];

      const configMeta = await fetchConfig(mockBasePath);

      expect(configMeta).toBe(undefined);
    });
  });

  describe('fetchPackage', () => {
    it('correctly fetches package and returns a config', async () => {
      const mockFilePath = 'path/to/config.hypermod.js';
      const mockPackageManager = {
        install: jest.fn(),
        getInfo: jest.fn().mockReturnValue({ location: mockFilePath }),
        require: jest.fn().mockReturnValue(mockConfig),
      };

      const { filePath, config } = await fetchPackage(
        'fake-package',
        mockPackageManager as unknown as PluginManager,
      );

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(mockFilePath);
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
          mockPackageManager as unknown as PluginManager,
        ),
      ).rejects.toEqual('Import error');
    });
  });

  describe('fetchRemotePackage', () => {
    it('correctly fetches package and returns a config', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        require: jest
          .fn()
          .mockReturnValueOnce({}) // fail the entrypoint config check
          .mockReturnValueOnce(mockConfig),
        getInfo: jest.fn().mockReturnValue({
          location: mockBasePath,
        }),
      };

      const { config, filePath } = await fetchRemotePackage(
        'fake-package',
        mockPackageManager as unknown as PluginManager,
      );

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(mockBasePath + '/hypermod.config.js');
    });

    it('should throw if fetching fails', async () => {
      const mockPackageManager = {
        install: jest.fn().mockRejectedValue('Import error'),
      };

      expect.assertions(1);

      await expect(
        fetchRemotePackage(
          'fake-package',
          mockPackageManager as unknown as PluginManager,
        ),
      ).rejects.toEqual('Import error');
    });

    it('correctly fetches package and returns an entrypoint-based config', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        require: jest.fn().mockReturnValueOnce(mockConfig),
        getInfo: jest.fn().mockReturnValue({
          location: mockBasePath + '/index.js',
        }),
      };

      const { config, filePath } = await fetchRemotePackage(
        'fake-package',
        mockPackageManager as unknown as PluginManager,
      );

      expect(config).toEqual(mockConfig);
      expect(filePath).toEqual(mockBasePath + '/index.js');
    });

    it('throws if entrypoint-based config does not contain a valid config (and there are no config files available elsewhere)', async () => {
      const mockPackageManager = {
        install: jest.fn(),
        require: jest.fn().mockReturnValueOnce({}),
        getInfo: jest.fn().mockReturnValue({
          location: mockBasePath + '/index.js',
        }),
      };

      (globby as unknown as jest.Mock).mockImplementation(() =>
        Promise.resolve([]),
      );

      const res = await fetchRemotePackage(
        'fake-package',
        mockPackageManager as unknown as PluginManager,
      );

      expect(res).toBeUndefined();
    });

    it('should throw if fetching fails', async () => {
      const mockPackageManager = {
        install: jest.fn().mockRejectedValue('Import error'),
      };

      expect.assertions(1);

      await expect(
        fetchRemotePackage(
          'fake-package',
          mockPackageManager as unknown as PluginManager,
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
          mockPackageManager as unknown as PluginManager,
        ),
      ).rejects.toEqual(
        new Error(`Unable to locate package files for package: 'fake-package'`),
      );
    });
  });
});
