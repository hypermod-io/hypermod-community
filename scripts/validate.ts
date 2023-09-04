import fs, { lstatSync, existsSync } from 'fs-extra';
import junk from 'junk';
import path from 'path';
import chalk from 'chalk';
import { isValidPackageName, isValidConfigAtPath } from '@hypermod/validator';

const validPackageNameFormat =
  /^@hypermod\/mod(-[a-zA-Z0-9]+)*(-(?!__)[a-zA-Z0-9]+)*(__([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)?)?$/;

function isValidPackageJson(basePath: string) {
  const pkgJsonPath = path.join(basePath, 'package.json');
  const pkgJsonRaw = fs.readFileSync(pkgJsonPath, {
    encoding: 'utf-8',
  });
  const pkgJson = JSON.parse(pkgJsonRaw);

  if (!validPackageNameFormat.test(pkgJson.name)) {
    throw new Error(`Invalid package name: ${pkgJson.name} in: ${pkgJsonPath}.
If this is a scoped package, please make sure rename the folder to use the "__" characters to denote submodule.
For example: @hypermod/mod-foo__bar`);
  }

  if (pkgJson.name === 'dist/hypermod.config.js') {
    throw new Error(`Invalid package entry point for package: ${pkgJson.name} in: ${pkgJsonPath}.
'main' should always point to 'dist/hypermod.config.js'`);
  }

  return true;
}

async function main(targetPath: string) {
  const directories = await fs.readdir(targetPath);

  directories
    .filter(dir => !junk.is(dir))
    .forEach(async dir => {
      if (!isValidPackageName(dir)) {
        throw new Error(
          `Invalid package name: ${dir}.
If this is a scoped package, please make sure rename the folder to use the "__" characters to denote submodule.
For example: @foo/bar => @foo__bar`,
        );
      }

      const basePath = path.join(__dirname, '..', targetPath, dir);
      const sourcePath = path.join(basePath, 'src');
      await isValidConfigAtPath(basePath);
      await isValidPackageJson(basePath);

      const subDirectories = await fs.readdir(sourcePath);
      subDirectories
        .filter(dir => !junk.is(dir))
        .forEach(async subDir => {
          const subPath = path.join(sourcePath, subDir);

          if (
            lstatSync(subPath).isDirectory() &&
            !existsSync(path.join(subPath, 'transform.ts')) &&
            !existsSync(path.join(subPath, 'transform.js'))
          ) {
            throw new Error(
              `Unable to find transform entry-point for directory "${subPath}". Please ensure you have a valid transform.(ts|js) file containing the entry-point for your codemod`,
            );
          }
        });
    });
}

(async function () {
  try {
    main(process.argv[2]);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
})();
