import path from 'path';

import { fetchHmPkg } from '../fetchers/app';

export async function resolveAppTransforms(pkg: string, dir: string) {
  const transformMeta = await fetchHmPkg(pkg, dir);

  // find entry point
  const entryPoint = transformMeta.transform.sources.find(
    source =>
      source.name.includes('transform.ts') ||
      source.name.includes('transform.js'),
  );

  if (!entryPoint) {
    throw new Error(
      `Unable to locate transform entry point in package: ${pkg}`,
    );
  }

  return path.join(dir, pkg, entryPoint.name);
}
