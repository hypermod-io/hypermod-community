import path from 'path';
import { PluginManager } from 'live-plugin-manager';

import { CodeshiftConfig } from '@codeshift/types';

export function fetchConfig(filePath: string): CodeshiftConfig | undefined {
  let config: CodeshiftConfig | undefined;

  [
    path.join(filePath, 'codeshift.config.js'),
    path.join(filePath, 'codeshift.config.ts'),
    path.join(filePath, 'src', 'codeshift.config.js'),
    path.join(filePath, 'src', 'codeshift.config.ts'),
    path.join(filePath, 'codemods', 'codeshift.config.js'),
    path.join(filePath, 'codemods', 'codeshift.config.ts'),
  ].forEach(searchPath => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require(searchPath);
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
  let config = await fetchPackage(packageName, packageManager);

  if (config) return config;

  const info = packageManager.getInfo(packageName);

  if (!info) return undefined;

  return fetchConfig(info.location);
}
