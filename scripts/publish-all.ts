import {
  getAllPackages,
  buildPackages,
  generatePackages,
  cleanTargetDir,
  publishPackages,
} from '@codeshift/publisher';

async function main(sourcePath: string, targetPath: string) {
  cleanTargetDir(targetPath);

  const packages = getAllPackages(sourcePath);
  console.log(packages);

  console.log('Generating temporary directory');
  await generatePackages(sourcePath, targetPath, packages);

  console.log('Building all packages');
  await buildPackages();

  console.log('Publishing all packages');
  await publishPackages(targetPath, process.env.NPM_TOKEN!);

  console.log('Cleaning up temporary directory');
  cleanTargetDir(targetPath);
}

main(process.argv[2], process.argv[3]).catch(error => {
  console.error('Publishing error:', error.message);
});
