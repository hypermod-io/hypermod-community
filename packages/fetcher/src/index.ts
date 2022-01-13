import path from 'path';
import globby from 'globby';
import { PluginManager } from 'live-plugin-manager';

import { CodeshiftConfig } from '@codeshift/types';

export async function fetchConfig(
  filePath: string,
): Promise<CodeshiftConfig | undefined> {
  let config: CodeshiftConfig | undefined;

  const matchedPaths = await globby([
    path.join(filePath, 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'src', 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'codemods', 'codeshift.config.(js|ts|tsx)'),
  ]);

  matchedPaths.forEach(matchedPath => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require(matchedPath);
      const searchConfig = pkg.default ? pkg.default : pkg;
      config = searchConfig;
    } catch (e) {}
  });

  return config;
}

export async function fetchPackage(
  packageName: string,
  packageManager: PluginManager,
): Promise<CodeshiftConfig | undefined> {
  await packageManager.install(packageName);
  const pkg = packageManager.require(packageName);
  const config: CodeshiftConfig = pkg.default ? pkg.default : pkg;
  return config;
}

export async function fetchRemotePackage(
  packageName: string,
  packageManager: PluginManager,
): Promise<CodeshiftConfig | undefined> {
  const config = await fetchPackage(packageName, packageManager);
  if (config) return config;

  const info = packageManager.getInfo(packageName);
  if (!info) return undefined;

  return await fetchConfig(info.location);
}
