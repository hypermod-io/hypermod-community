jest.mock('live-plugin-manager');

import chalk from 'chalk';
import { PluginManager } from 'live-plugin-manager';

import list from './list';

describe('list', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();

    (PluginManager as jest.Mock).mockImplementation(() => ({
      install: jest.fn().mockResolvedValue(undefined),
      getInfo: jest.fn().mockReturnValue({ location: 'path/to/config' }),
      require: jest.fn().mockImplementation(() => ({
        transforms: {
          '18.0.0': 'path/to/18.js',
          '19.0.0': 'path/to/19.js',
        },
        presets: {
          'sort-imports': 'path/to/sort-imports.js',
        },
      })),
    }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should list codemods for single valid package', async () => {
    await list(['foobar']);

    const result = (console.log as jest.Mock).mock.calls.join('\n');

    expect(result).toEqual(`${chalk.bold('foobar')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports`);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should list codemods for single valid scoped package', async () => {
    await list(['@foo/bar']);

    const result = (console.log as jest.Mock).mock.calls.join('\n');

    expect(result).toEqual(`${chalk.bold('@foo/bar')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports`);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should list codemods for multiple packages', async () => {
    await list(['bar', '@foo/bar']);

    const result = (console.log as jest.Mock).mock.calls.join('\n');

    expect(result).toEqual(`${chalk.bold('bar')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports
${chalk.bold('@foo/bar')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports`);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should return error message a package is not found', async () => {
    (PluginManager as jest.Mock).mockImplementation(() => ({
      install: jest.fn().mockImplementation(() => {
        throw new Error('404 not found');
      }),
    }));

    await list(['bar']);

    expect(console.warn).toHaveBeenCalledWith(
      chalk.red(`Unable to find codeshift package: ${chalk.bold('bar')}.`),
    );
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('should return error message for multiple packages that are not found', async () => {
    (PluginManager as jest.Mock).mockImplementation(() => ({
      install: jest.fn().mockImplementation(() => {
        throw new Error('404 not found');
      }),
    }));

    await list(['bar', '@foo/bar']);

    expect(console.warn).toHaveBeenCalledWith(
      chalk.red(`Unable to find codeshift package: ${chalk.bold('bar')}.`),
    );
    expect(console.warn).toHaveBeenCalledWith(
      chalk.red(`Unable to find codeshift package: ${chalk.bold('@foo/bar')}.`),
    );
    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  it('should continue if one or more packages are not found', async () => {
    (PluginManager as jest.Mock).mockImplementation(() => ({
      install: jest.fn().mockImplementation((packageName: string) => {
        if (packageName.includes('unknown') || packageName.includes('dunno')) {
          throw new Error('404 not found');
        }
      }),
      getInfo: jest.fn().mockReturnValue({ location: 'path/to/config' }),
      require: jest.fn().mockImplementation(() => ({
        transforms: {
          '18.0.0': 'path/to/18.js',
          '19.0.0': 'path/to/19.js',
        },
        presets: {
          'sort-imports': 'path/to/sort-imports.js',
        },
      })),
    }));

    await list(['unknown', 'found1', 'dunno', 'found2']);

    const result = (console.log as jest.Mock).mock.calls.join('\n');

    expect(result).toEqual(`${chalk.bold('found1')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports
${chalk.bold('found2')}
├─ transforms
|  ├─ 18.0.0
|  └─ 19.0.0
└─ presets
   └─ sort-imports`);

    expect(console.warn).toHaveBeenCalledWith(
      chalk.red(`Unable to find codeshift package: ${chalk.bold('unknown')}.`),
    );
    expect(console.warn).toHaveBeenCalledWith(
      chalk.red(`Unable to find codeshift package: ${chalk.bold('dunno')}.`),
    );
    expect(console.warn).toHaveBeenCalledTimes(2);
  });
});
