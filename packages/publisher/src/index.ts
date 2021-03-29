import generatePackages, { cleanTargetDir } from './generatePackages';

interface Options {
  sourcePath?: string;
  tempDirectoryPath?: string;
}

async function main({
  sourcePath = '../../community',
  tempDirectoryPath = '../../.tmp',
}: Options) {
  cleanTargetDir(tempDirectoryPath);

  console.log('Generating temporary directory');
  // await getChangedPackages();
  await generatePackages(sourcePath, tempDirectoryPath);
  // await createSearchIndex(allPackages, infoClient);
  // await publishPackages(changedPackages, dry, githubAccessToken, fetcher);
  // await publishRegistry(dt, allPackages, dry, infoClient); https://www.npmjs.com/package/npm-registry-client
  // await validate(dt);

  console.log('Cleaning up temporary directory');
  cleanTargetDir(tempDirectoryPath);
}

//TODO: fix this
main({
  sourcePath: '../../community',
  tempDirectoryPath: '../../.tmp',
});
