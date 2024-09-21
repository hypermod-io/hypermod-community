/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import globby from 'globby';

import { Config } from '@hypermod/types';

export interface ModuleLoader {
  install: (packageName: string) => Promise<void>;
  getInfo: (packageName: string) => {
    location: string;
    entryPath: string;
    pkgJson: any;
  };
  require: (packageName: string) => any;
}

export interface ConfigMeta {
  filePath: string;
  config: Config;
}

function resolveConfigExport(pkg: any): Config {
  return pkg.default ? pkg.default : pkg;
}

function requireConfig(filePath: string, resolvedPath: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(resolvedPath);
    return resolveConfigExport(pkg);
  } catch (e) {
    console.log(resolvedPath, e);

    throw new Error(
      `Found config file "${filePath}" but was unable to parse it. This can be caused when transform or preset paths are incorrect.`,
    );
  }
}

export async function fetchConfig(
  filePath: string,
): Promise<ConfigMeta | undefined> {
  const configs = await fetchConfigs(filePath);
  return configs[0];
}

export async function fetchConfigs(filePath: string): Promise<ConfigMeta[]> {
  const matchedPaths = await globby([
    path.join(filePath, 'hypermod.config.(js|ts|tsx)'),
    path.join(filePath, 'src', 'hypermod.config.(js|ts|tsx)'),
    path.join(filePath, 'codemods', 'hypermod.config.(js|ts|tsx)'),
    path.join(filePath, 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'src', 'codeshift.config.(js|ts|tsx)'),
    path.join(filePath, 'codemods', 'codeshift.config.(js|ts|tsx)'),
  ]);

  const configs = [];

  for (const matchedPath of matchedPaths) {
    const resolvedMatchedPath = path.resolve(matchedPath);
    const exists = fs.existsSync(resolvedMatchedPath);

    if (!exists) continue;

    configs.push({
      filePath: matchedPath,
      config: requireConfig(matchedPath, resolvedMatchedPath),
    });
  }

  return configs;
}

export async function fetchConfigAtPath(filePath: string): Promise<Config> {
  const resolvedFilePath = path.resolve(filePath);
  const exists = fs.existsSync(resolvedFilePath);

  if (!exists) {
    throw new Error(`Unable to find config at path: ${filePath}`);
  }

  return requireConfig(filePath, resolvedFilePath);
}

export async function fetchPackage(
  packageName: string,
  packageManager: ModuleLoader,
): Promise<ConfigMeta> {
  await packageManager.install(packageName);
  const pkg = packageManager.require(packageName);
  const info = packageManager.getInfo(packageName);

  if (!info) {
    throw new Error(`Unable to find package info for: ${packageName}`);
  }

  return {
    filePath: info.location,
    config: resolveConfigExport(pkg),
  };
}

export async function fetchRemotePackage(
  packageName: string,
  packageManager: ModuleLoader,
): Promise<ConfigMeta | undefined> {
  if (['javascript', 'typescript'].includes(packageName)) {
    throw new Error(`'${packageName}' is ignored as a remote package.`);
  }

  await packageManager.install(packageName);

  let info;

  try {
    info = packageManager.getInfo(packageName);

    if (!info) {
      throw new Error();
    }
  } catch (error) {
    throw new Error(
      `Unable to locate package files for package: '${packageName}'`,
    );
  }

  // Search main entrypoint for transform/presets from the default import
  try {
    const pkg = packageManager.require(packageName);
    const configExport = resolveConfigExport(pkg);

    if (configExport.transforms || configExport.presets) {
      return {
        filePath: info.location,
        config: configExport,
      };
    }
  } catch (e) {
    // Swallow this error
    if (process.env.NODE_ENV !== 'production') {
      console.error('Remote package config parsing error:');
      console.error(e);
    }
  }

  return await fetchConfig(info.location);
}
