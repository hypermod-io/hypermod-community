import path from 'path';
import fs from 'fs-extra';
import { installPackage } from '@antfu/install-pkg';

const ModuleLoader = () => {
  const getInfo = async (packageName: string) => {
    // @ts-expect-error Experimental loader
    const entryPath = await import.meta.resolve(packageName);
    const location = (entryPath.split(packageName)[0] + packageName).replace(
      'file://',
      '',
    );
    const pkgJsonRaw = fs.readFileSync(
      path.join(location.replace('file://', ''), 'package.json'),
      'utf8',
    );
    const pkgJson = JSON.parse(pkgJsonRaw);

    return { location, entryPath, pkgJson };
  };

  const install = async (packageName: string) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    await installPackage(packageName, {
      cwd: __dirname,
      packageManager: 'npm',
      additionalArgs: ['--force'],
    });

    const { pkgJson } = await getInfo(packageName);

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
    require: async (packageName: string) => import(packageName),
  };
};

export default ModuleLoader;
