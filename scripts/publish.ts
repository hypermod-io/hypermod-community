import {
  getChangedPackages,
  buildPackages,
  generatePackages,
  cleanTargetDir,
  publishPackages,
} from '@codeshift/publisher';

async function main(sourcePath: string, targetPath: string) {
  cleanTargetDir(targetPath);

  console.log('Calculating changed packages');
  const changedPackages = await getChangedPackages(
    process.env.GITHUB_EVENT_PATH!,
  );

  if (changedPackages.length === 0) {
    console.log('🤷‍♂️ No packages changed, exiting...');
    process.exit(0);
  }

  console.log('🚚 Changed packages', changedPackages);

  console.log('✨ Generating temporary directory');
  await generatePackages(sourcePath, targetPath, changedPackages);

  console.log('🏗 Building changed packages');
  await buildPackages(targetPath, changedPackages);

  console.log('📦 Publishing changed packages');
  await publishPackages(targetPath, process.env.NPM_TOKEN!);

  console.log('🧹 Cleaning up temporary directory');
  cleanTargetDir(targetPath);
}

main(process.argv[2], process.argv[3]).catch(error => {
  console.error('Publishing error:', error.message);
  process.exit(1);
});
