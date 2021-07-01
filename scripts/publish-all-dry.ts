import {
  getAllPackages,
  buildPackages,
  generatePackages,
  cleanTargetDir,
} from '@codeshift/publisher';

async function main(sourcePath: string, targetPath: string) {
  cleanTargetDir(targetPath);

  const packages = getAllPackages(sourcePath);
  console.log(packages);

  console.log('Generating temporary directory');
  await generatePackages(sourcePath, targetPath, packages);

  console.log('Building all packages');
  await buildPackages();
}

main(process.argv[2], process.argv[3]).catch(error => {
  console.error('Publishing error:', error.message);
});
