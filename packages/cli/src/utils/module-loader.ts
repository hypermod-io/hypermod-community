import path from 'path';
import fs from 'fs-extra';
import { installPackage } from '@antfu/install-pkg';

import { ModuleLoader } from '@hypermod/fetcher';

const ModuleLoader = (config: {
  npmRegistryUrl?: string;
  authToken?: string;
}): ModuleLoader => {
  const getInfo = (packageName: string) => {
    const entryPath = require.resolve(packageName);
    const location = entryPath.split(packageName)[0] + packageName;
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
      cwd: __dirname,
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

    const { pkgJson } = getInfo(packageName);

    // Install whitelisted devDependencies
    if (pkgJson?.hypermod?.dependencies) {
      await Promise.all(
        pkgJson.hypermod.dependencies.map((dep: string) => {
          const version = pkgJson.devDependencies[dep];
          if (!version) return;
          return installPackage(`${dep}@${version}`, {
            cwd: __dirname,
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
    require: (packageName: string) => require(packageName),
  };
};

export default ModuleLoader;
