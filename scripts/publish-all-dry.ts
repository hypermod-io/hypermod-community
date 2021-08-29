import {
  getAllPackages,
  buildPackages,
  generatePackages,
  publishPackages,
  cleanTargetDir,
} from '@codeshift/publisher';

async function main(sourcePath: string, targetPath: string) {
  cleanTargetDir(targetPath);

  const packages = getAllPackages(sourcePath);

  console.log('✨ Generating temporary directory');
  await generatePackages(sourcePath, targetPath, packages);

  console.log('🏗 Building all packages');
  await buildPackages(targetPath, packages);

  console.log('📦 Publishing changed packages (dry)');
  await publishPackages(targetPath, { dry: true }, process.env.NPM_TOKEN!);
}

main(process.argv[2], process.argv[3]).catch(error => {
  console.error('Publishing error:', error.message);
  process.exit(1);
});
