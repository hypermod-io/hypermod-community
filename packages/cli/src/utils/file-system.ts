import fs from 'fs-extra';
import findUp from 'find-up';

import { fetchConfigs } from '@hypermod/fetcher';
import { Config } from '@hypermod/types';

export async function getPackageJson() {
  let rootPackageJson: any;
  const packageJsonPath = await findUp('package.json');

  if (packageJsonPath) {
    const packageJsonRaw = await fs.readFile(packageJsonPath, 'utf8');
    rootPackageJson = JSON.parse(packageJsonRaw);
  }

  return rootPackageJson;
}

export async function fetchConfigsForWorkspaces(workspaces: string[]) {
  return await workspaces.reduce<
    Promise<{ filePath: string; config: Config }[]>
  >(async (accum, filePath) => {
    const configs = await fetchConfigs(filePath);
    if (!configs.length) return accum;
    const results = await accum;
    return [...results, ...configs];
  }, Promise.resolve([]));
}
