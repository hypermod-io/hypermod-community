jest.mock('jscodeshift/src/Runner', () => ({
  run: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock('live-plugin-manager', () => ({
  PluginManager: () => ({
    install: () => Promise.resolve(undefined),
    require: (codemodName: string) => ({
      default: {
        transforms: {
          '18.0.0': `${codemodName}/path/to/18.js`,
          '19.0.0': `${codemodName}/path/to/19.js`,
          '20.0.0': `${codemodName}/path/to/20.js`,
        },
      },
    }),
    uninstallAll: () => Promise.resolve(),
  }),
}));

// jest.mock('fs-extra', () => ({
//   readdir: () =>
//     Promise.resolve([
//       '18.0.0',
//       '19.0.0',
//       '20.0.0',
//       'codeshift.config.js',
//       'index.ts',
//     ]),
// }));

// @ts-ignore
import * as jscodeshift from 'jscodeshift/src/Runner';

import main from './main';

const mockPath = 'src/pages/home-page/';

describe('main', () => {
  beforeEach(() => {
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

    it('should exit early if nether a package or transform is supplied', async () => {
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

      expect(jscodeshift.run).toHaveBeenCalledWith(
        mockTransformPath,
        expect.arrayContaining([mockPath, 'src/foo']),
        expect.objectContaining({
          parser: 'babel',
          extensions: 'js',
        }),
      );
    });

    it('should transform js code', async () => {
      await main([mockPath], {
        transform: mockTransformPath,
        parser: 'babel',
        extensions: 'js,jsx',
      });

      expect(jscodeshift.run).toHaveBeenCalledWith(
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

      expect(jscodeshift.run).toHaveBeenCalledWith(
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

      expect(jscodeshift.run).toHaveBeenCalledWith(
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
    it('should run package transform for single version', async () => {
      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
      });

      expect(jscodeshift.run).toHaveBeenCalledTimes(1);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/18.js',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'babel',
          extensions: 'js',
        }),
      );
    });

    it('should run all package transforms for a package in sequence', async () => {
      await main([mockPath], {
        packages: 'mylib@18.0.0',
        parser: 'babel',
        extensions: 'js',
        sequence: true,
      });

      expect(jscodeshift.run).toHaveBeenCalledTimes(3);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/18.js',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'babel',
          extensions: 'js',
        }),
      );
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/19.js',
        expect.any(Array),
        expect.any(Object),
      );
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/20.js',
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

      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/19.js',
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

      expect(jscodeshift.run).toHaveBeenCalledTimes(2);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/20.js',
        expect.any(Array),
        expect.any(Object),
      );
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-myotherlib/path/to/20.js',
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

      expect(jscodeshift.run).toHaveBeenCalledTimes(2);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-myscope__mylib/path/to/20.js',
        expect.any(Array),
        expect.any(Object),
      );
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-myotherscope__myotherlib/path/to/20.js',
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

      expect(jscodeshift.run).toHaveBeenCalledTimes(1);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/20.js',
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
          'Invalid version provided to the --packages flag. Package mylib@NOT_SEMVER is missing version. Please try: "@[scope]/[package]@[version]" for example @mylib/avatar@10.0.0',
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

      expect(jscodeshift.run).toHaveBeenCalledTimes(2);
      expect(jscodeshift.run).toHaveBeenCalledWith(
        '@codeshift/mod-mylib/path/to/20.js',
        expect.arrayContaining([mockPath]),
        expect.objectContaining({
          parser: 'babel',
          extensions: 'js',
        }),
      );
      expect(jscodeshift.run).toHaveBeenCalledWith(
        'path/to/transform.ts',
        expect.any(Array),
        expect.any(Object),
      );
    });
  });
});
