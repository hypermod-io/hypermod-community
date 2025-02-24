import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { installPackage } from '@antfu/install-pkg';

import { ModuleLoader } from '@hypermod/fetcher';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Register the TSX plugin to allow require TS(X) files.
 */
import { register } from 'tsx/esm/api';
register();

const ModuleLoader = (config: {
  npmRegistryUrl?: string;
  authToken?: string;
}): ModuleLoader => {
  const getInfo = async (packageName: string) => {
    // @ts-expect-error - TS doesn't know about import.meta
    const entryPath = await import.meta.resolve(packageName);
    const location = (entryPath.split(packageName)[0] + packageName).replace(
      'file://',
      '',
    );
    const pkgJsonRaw = fs.readFileSync(
      path.join(location, 'package.json'),
      'utf8',
    );
    const pkgJson = JSON.parse(pkgJsonRaw);

    return {
      location,
      entryPath,
      pkgJson,
    };
  };

  const install = async (packageName: string) => {
    await installPackage(packageName, {
      cwd: dirname,
      packageManager: 'npm',
      additionalArgs: [
        '--force',
        // --registry=https://your-custom-registry-url/ --//your-custom-registry-url/:_authToken=YOUR_AUTH_TOKEN
        config.npmRegistryUrl ? `--registry=${config.npmRegistryUrl}` : '',
        config.authToken
          ? `--${config.npmRegistryUrl}/:_authToken=${config.authToken}`
          : '',
      ],
    });

    const { pkgJson } = await getInfo(packageName);

    // Install whitelisted devDependencies
    if (pkgJson?.hypermod?.dependencies) {
      await Promise.all(
        pkgJson.hypermod.dependencies.map((dep: string) => {
          const version = pkgJson.devDependencies[dep];
          if (!version) return;
          return installPackage(`${dep}@${version}`, {
            cwd: dirname,
            packageManager: 'npm',
            additionalArgs: ['--force'],
          });
        }),
      );
    }
  };

  return {
    install,
    getInfo,
    require: async (packageName: string) => await import(packageName),
  };
};

export default ModuleLoader;
