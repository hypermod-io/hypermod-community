import fs from 'fs-extra';
import semver from 'semver';

function transformPackageName(packageName: string) {
  return packageName.replace('/', '__');
}

function main(packageName: string, version: string) {
  if (!packageName) throw new Error('Package name was not provided');
  if (!version) throw new Error('Version was not provided');

  if (!semver.valid(version)) {
    throw new Error(
      `Provided version ${version} is not a valid semver version`,
    );
  }

  const communityDirectoryPath = `${__dirname}/../../../community`;
  const safePackageName = transformPackageName(packageName);
  const codemodBasePath = `${communityDirectoryPath}/${safePackageName}`;
  const codemodPath = `${codemodBasePath}/${version}`;
  const configPath = `${codemodBasePath}/codeshift.config.js`;
  const testsPath = `${codemodPath}/_tests_`;
  const motionsPath = `${codemodPath}/motions`;

  fs.mkdirSync(codemodPath, { recursive: true });
  fs.copySync(`${__dirname}/../template/motions`, motionsPath);
  fs.copySync(`${__dirname}/../template/_tests_`, testsPath);

  const testFile = fs
    .readFileSync(`${testsPath}/transform.spec.ts`, 'utf8')
    .replace('<% packageName %>', packageName)
    .replace('<% version %>', version);

  fs.writeFileSync(`${testsPath}/transform.spec.ts`, testFile);

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `export default {
  maintainers: ['danieldelcore'],
};`,
    );
  }

  fs.copyFileSync(
    `${__dirname}/../template/transform.ts`,
    `${codemodPath}/transform.ts`,
  );

  console.log(
    `🚚 New codemod package created at: community/${safePackageName}/${version}`,
  );
}

main(process.argv[2], process.argv[3]);
