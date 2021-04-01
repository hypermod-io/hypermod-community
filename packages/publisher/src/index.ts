import generatePackages, { cleanTargetDir } from './generate-packages';
import getChangedPackages from './changed-packages';
import buildPackages from './build-packages';

async function main(
  sinceRef: string,
  sourcePath = '../../community',
  tempDirectoryPath = '../../.tmp',
) {
  cleanTargetDir(tempDirectoryPath);

  console.log('Calculating changed packages');

  const changedPackages = await getChangedPackages(sinceRef);
  console.log('Changed packages', changedPackages);

  console.log('Generating temporary directory');
  generatePackages(sourcePath, tempDirectoryPath, changedPackages);

  console.log('Building changed packages');
  await buildPackages();

  console.log('Publishing changed packages');
  // await publishPackages(dry, githubAccessToken, fetcher);

  console.log('Cleaning up temporary directory');
  cleanTargetDir(tempDirectoryPath);
}

//TODO: fix this
main('09c33fe', '../../community', '../../.tmp');
