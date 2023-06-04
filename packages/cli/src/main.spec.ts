jest.mock('globby');
jest.mock('live-plugin-manager');
jest.mock('find-up');
jest.mock('@codeshift/core', () => ({
  run: jest.fn().mockImplementation(() => Promise.resolve()),
}));

import fs from 'fs';
import path from 'path';
import { PluginManager } from 'live-plugin-manager';
import globby from 'globby';

import * as core from '@codeshift/core';

import main from './main';

const mockPath = 'src/pages/home-page/';

describe('main', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when validating flags', () => {
    it('should exit early if file path is not supplied', async () => {
      expect.assertions(1);

      try {
        await main([], { transform: 'path/to/transform.ts' });
      } catch (error) {
        // @ts-ignore
        expect(error.message).toMatch(
          'No path provided, please specify which files your codemod should modify',
        );
      }
    });

    it('should throw if nether a package or transform is supplied and unable to find local config', async () => {
      expect.assertions(1);

      try {
        await main([mockPath], {});
      } catch (error) {
        // @ts-ignore
        expect(error.message).toMatch(
          'No transform provided, please specify a transform with either the --transform or --packages flags',
        );
      }
    });
  });

  describe('when running transforms with the -t flag', () => {
    const mockTransformPath = 'path/to/transform.ts';

    it('should run transforms against multiple file paths', async () => {
      await main([mockPath, 'src/foo'], {
        transform: mockTransformPath,
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledWith(
        mockTransformPath,
        expect.arrayContaining([mockPath, 'src/foo']),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });

    it('should transform js code', async () => {
      await main([mockPath], {
        transform: mockTransformPath,
        parser: 'babel',
        extensions: 'js,jsx',
      });

      expect(core.run).toHaveBeenCalledWith(
        mockTransformPath,
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'babel',
          extensions: 'js,jsx',
        }),
      );
    });

    it('should transform typescript code', async () => {
      await main([mockPath], {
        transform: mockTransformPath,
        parser: 'tsx',
        extensions: 'ts,tsx',
      });

      expect(core.run).toHaveBeenCalledWith(
        mockTransformPath,
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'tsx',
          extensions: 'ts,tsx',
        }),
      );
    });

    it('should transform flow code', async () => {
      await main([mockPath], {
        transform: mockTransformPath,
        parser: 'flow',
        extensions: 'js,jsx',
      });

      expect(core.run).toHaveBeenCalledWith(
        mockTransformPath,
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'flow',
          extensions: 'js,jsx',
        }),
      );
    });
  });

  describe('when running transforms with the -p flag', () => {
    beforeEach(() => {
      (PluginManager as jest.Mock).mockImplementation(() => ({
        install: jest.fn().mockResolvedValue(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        require: jest.fn().mockImplementation((packageName: string) => {
          if (!packageName.startsWith('@codeshift')) {
            throw new Error('Attempted to fetch codemod from npm');
          }

          return {
            transforms: {
              '18.0.0': jest.fn(),
              '19.0.0': jest.fn(),
              '20.0.0': jest.fn(),
            },
          };
        }),
        uninstallAll: jest.fn().mockResolvedValue(undefined),
      }));
    });

    it('should run package transform for single version', async () => {
      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@18.0.0',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });

    it('should run all package transforms for a package in sequence', async () => {
      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
        sequence: true,
      });

      expect(core.run).toHaveBeenCalledTimes(3);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@18.0.0',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@19.0.0',
        expect.any(Array),
        expect.any(Object),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should run scoped package transforms', async () => {
      await main([mockPath], {
        packages: '@myscope/mylib@19.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/source/codeshift.config.js@19.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should run multiple package transforms', async () => {
      await main([mockPath], {
        packages: 'mylib@20.0.0,myotherlib@20.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myotherlib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should run multiple scoped package transforms', async () => {
      await main([mockPath], {
        packages: '@myscope/mylib@20.0.0,@myotherscope/myotherlib@20.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myotherscope__myotherlib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should run multiple transforms of the same package', async () => {
      await main([mockPath], {
        packages: '@myscope/mylib@20.0.0@19.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/source/codeshift.config.js@19.0.0',
        expect.any(Array),
        expect.any(Object),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should handle empty package transforms', async () => {
      await main([mockPath], {
        packages: 'mylib@20.0.0,,,',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should throw when package format is invalid', async () => {
      expect.assertions(1);

      try {
        await main([mockPath], {
          packages: 'mylib@NOT_SEMVER',
          parser: 'babel',
          extensions: 'js',
        });
      } catch (error) {
        // @ts-ignore
        expect(error.message).toMatch(
          'Invalid version provided to the --packages flag. Unable to resolve version "NOT_SEMVER" for package "mylib". Please try: "[scope]/[package]@[version]" for example @mylib/mypackage@10.0.0',
        );
      }
    });

    it('should throw when transform is not found', async () => {
      expect.assertions(1);

      try {
        await main([mockPath], {
          packages: 'mylib@120.0.0',
          parser: 'babel',
          extensions: 'js',
        });
      } catch (error) {
        // @ts-ignore
        expect(error.message).toMatch(
          'Invalid version provided to the --packages flag. Unable to resolve version "120.0.0" for package "mylib"',
        );
      }
    });

    it('should run both transforms and package transforms', async () => {
      await main([mockPath], {
        packages: 'mylib@20.0.0',
        transform: 'path/to/transform.ts',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@20.0.0',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
      expect(core.run).toHaveBeenCalledWith(
        'path/to/transform.ts',
        expect.any(Array),
        expect.any(Object),
      );
    });

    it('should not throw when attempting to run transform that is not present in config', async () => {
      (PluginManager as jest.Mock).mockReturnValue({
        install: () => Promise.resolve(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        require: () => ({
          presets: {
            'update-formatting': jest.fn(),
          },
        }),
        uninstallAll: () => Promise.resolve(),
      });

      await expect(
        main([mockPath], {
          packages: 'mylib@20.0.0',
          parser: 'babel',
          extensions: 'js',
        }),
      ).rejects.toEqual(
        Error(
          'Invalid version provided to the --packages flag. Unable to resolve version "20.0.0" for package "mylib"',
        ),
      );
    });

    it('should not throw when transform are not present in the config', async () => {
      (PluginManager as jest.Mock).mockReturnValue({
        install: () => Promise.resolve(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        // @ts-ignore
        require: () => ({
          presets: {
            'update-formatting': jest.fn(),
          },
        }),
        uninstallAll: () => Promise.resolve(),
      });

      await expect(
        main([mockPath], {
          packages: 'mylib#update-formatting',
          parser: 'babel',
          extensions: 'js',
        }),
      ).resolves.not.toThrow();
    });
  });

  describe('when running presets with the -p flag', () => {
    beforeEach(() => {
      (PluginManager as jest.Mock).mockImplementation(() => ({
        install: jest.fn().mockResolvedValue(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        require: jest.fn().mockImplementation((packageName: string) => {
          if (!packageName.startsWith('@codeshift')) {
            throw new Error('Attempted to fetch codemod from npm');
          }

          return {
            presets: {
              'update-formatting': jest.fn(),
              'update-imports': jest.fn(),
            },
          };
        }),
        uninstallAll: jest.fn().mockResolvedValue(undefined),
      }));
    });

    it('should run single preset', async () => {
      await main([mockPath], {
        packages: 'mylib#update-formatting',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js#update-formatting',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });

    it('should run multiple presets', async () => {
      await main([mockPath], {
        packages: 'mylib#update-formatting,mylib#update-imports',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js#update-imports',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js#update-imports',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });

    it('should run multiple presets of the same package', async () => {
      await main([mockPath], {
        packages: 'mylib#update-formatting#update-imports',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(2);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js#update-formatting',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js#update-imports',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });

    it('should throw when preset is not found', async () => {
      expect.assertions(1);

      try {
        await main([mockPath], {
          packages: 'mylib#does-not-exist',
          parser: 'babel',
          extensions: 'js',
        });
      } catch (error) {
        // @ts-ignore
        expect(error.message).toMatch(
          'Invalid preset provided to the --packages flag. Unable to resolve preset "does-not-exist" for package "mylib"',
        );
      }
    });

    it('should not throw when attempting to run preset that is not present in config', async () => {
      (PluginManager as jest.Mock).mockReturnValue({
        install: () => Promise.resolve(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        // @ts-ignore
        require: () => ({
          transforms: {
            '20.0.0': jest.fn(),
          },
        }),
        uninstallAll: () => Promise.resolve(),
      });

      await expect(
        main([mockPath], {
          packages: 'mylib#foo-bar',
          parser: 'babel',
          extensions: 'js',
        }),
      ).rejects.toEqual(
        Error(
          'Invalid preset provided to the --packages flag. Unable to resolve preset "foo-bar" for package "mylib"',
        ),
      );
    });

    it('should not throw when presets are not present in the config', async () => {
      (PluginManager as jest.Mock).mockReturnValue({
        install: () => Promise.resolve(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        // @ts-ignore
        require: () => ({
          transforms: {
            '20.0.0': jest.fn(),
          },
        }),
        uninstallAll: () => Promise.resolve(),
      });

      await expect(
        main([mockPath], {
          packages: 'mylib@20.0.0',
          parser: 'babel',
          extensions: 'js',
        }),
      ).resolves.not.toThrow();
    });
  });

  describe('when running transforms from NPM with the -p flag', () => {
    beforeEach(() => {
      const mockMatchedPath = path.join(
        'mylib',
        'path',
        'to',
        'source',
        'codeshift.config.js',
      );

      (globby as unknown as jest.Mock).mockImplementation(() =>
        Promise.resolve([mockMatchedPath]),
      );

      (PluginManager as jest.Mock).mockImplementation(() => ({
        install: jest.fn().mockResolvedValue(undefined),
        getInfo: jest.fn().mockReturnValue({ location: mockMatchedPath }),
        require: () => ({
          default: {
            transforms: {
              '18.0.0': jest.fn(),
            },
            presets: {
              'update-formatting': jest.fn(),
            },
          },
        }),
        uninstallAll: jest.fn().mockResolvedValue(undefined),
      }));
    });

    it('should run package transform for single version', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        'mylib/path/to/source/codeshift.config.js@18.0.0',
        expect.arrayContaining([mockPath]),
        expect.anything(),
      );
    });

    it('should run single preset', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      await main([mockPath], {
        packages: 'mylib#update-formatting',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        'mylib/path/to/source/codeshift.config.js#update-formatting',
        expect.arrayContaining([mockPath]),
        expect.anything(),
      );
    });
  });

  describe('when reading configs using non-cjs exports', () => {
    it('should read configs exported with export default', async () => {
      (PluginManager as jest.Mock).mockReturnValue({
        install: () => Promise.resolve(undefined),
        getInfo: jest.fn().mockImplementation((packageName: string) => ({
          location: `${packageName}/path/to/source/codeshift.config.js`,
        })),
        // @ts-ignore
        require: jest.fn().mockImplementationOnce(() => ({
          default: {
            transforms: {
              '18.0.0': jest.fn(),
            },
          },
        })),
        uninstallAll: () => Promise.resolve(),
      });

      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(core.run).toHaveBeenCalledTimes(1);
      expect(core.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/source/codeshift.config.js@18.0.0',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({ parser: 'babel', extensions: 'js' }),
      );
    });
  });

  describe('when using an alternative registry', () => {
    it('should use the passed registry url for the PluginManager', async () => {
      const spy = jest.fn();
      (PluginManager as jest.Mock).mockImplementation(
        spy.mockReturnValue({
          install: () => Promise.resolve(undefined),
          getInfo: jest.fn().mockImplementation((packageName: string) => ({
            location: `${packageName}/path/to/source/codeshift.config.js`,
          })),
          // @ts-ignore
          require: jest.fn().mockImplementationOnce(() => ({
            default: {
              transforms: {
                '18.0.0': jest.fn(),
              },
            },
          })),
          uninstallAll: () => Promise.resolve(),
        }),
      );

      await main([mockPath], {
        packages: 'mylib@18.0.0',
        registry: 'https://localhost:4875',
      });

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ npmRegistryUrl: 'https://localhost:4875' }),
      );
    });

    it('should use the passed registryToken for the PluginManager', async () => {
      const spy = jest.fn();
      (PluginManager as jest.Mock).mockImplementation(
        spy.mockReturnValue({
          install: () => Promise.resolve(undefined),
          getInfo: jest.fn().mockImplementation((packageName: string) => ({
            location: `${packageName}/path/to/source/codeshift.config.js`,
          })),
          // @ts-ignore
          require: jest.fn().mockImplementationOnce(() => ({
            default: {
              transforms: {
                '18.0.0': jest.fn(),
              },
            },
          })),
          uninstallAll: () => Promise.resolve(),
        }),
      );

      await main([mockPath], {
        packages: 'mylib@18.0.0',
        registryToken: '1234ABCD=',
      });

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          npmRegistryConfig: expect.objectContaining({
            auth: expect.objectContaining({ token: '1234ABCD=' }),
          }),
        }),
      );
    });
  });
});
