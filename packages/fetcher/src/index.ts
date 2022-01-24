import path from 'path';
import globby from 'globby';
import { PluginManager } from 'live-plugin-manager';

import { CodeshiftConfig } from '@codeshift/types';

function resolveConfigExport(pkg: any): CodeshiftConfig {
  return pkg.default ? pkg.default : pkg;
}

export async function fetchConfig(
  filePath: string,
): Promise<CodeshiftConfig | undefined> {
  const matchedPaths = await globby([
    path.join(filePath, 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'src', 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'codemods', 'codeshift.config.(js|ts|tsx)'),
  ]);

  for (const matchedPath of matchedPaths) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkg = require(matchedPath);
      return resolveConfigExport(pkg);
    } catch (e) {}
  }

  return undefined;
}

export async function fetchPackage(
  packageName: string,
  packageManager: PluginManager,
): Promise<CodeshiftConfig | undefined> {
  await packageManager.install(packageName);
  const pkg = packageManager.require(packageName);
  return resolveConfigExport(pkg);
}

export async function fetchRemotePackage(
  packageName: string,
  packageManager: PluginManager,
): Promise<CodeshiftConfig | undefined> {
  await packageManager.install(packageName);
  const info = packageManager.getInfo(packageName);

  if (!info) {
    throw new Error(
      `Unable to locate package files for package: '${packageName}'`,
    );
  }

  return await fetchConfig(info.location);
}
