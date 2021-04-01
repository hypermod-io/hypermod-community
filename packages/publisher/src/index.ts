import generatePackages, { cleanTargetDir } from './generate';
import getChangedPackages from './changed';
import buildPackages from './build';
import publishPackages from './publish';

async function main(sinceRef: string, sourcePath: string, targetPath: string) {
  cleanTargetDir(targetPath);

  console.log('Calculating changed packages');
  const changedPackages = await getChangedPackages(sinceRef);

  console.log('Changed packages', changedPackages);

  console.log('Generating temporary directory');
  await generatePackages(sourcePath, targetPath, changedPackages);

  console.log('Building changed packages');
  await buildPackages();

  console.log('Publishing changed packages');
  await publishPackages(targetPath, process.env.GITHUB_TOKEN!);

  console.log('Cleaning up temporary directory');
  // cleanTargetDir(targetPath);
}

main(process.argv[2], process.argv[3], process.argv[4]);
