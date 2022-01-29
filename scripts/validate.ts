import fs, { lstatSync, existsSync } from 'fs-extra';
import junk from 'junk';
import path from 'path';
import chalk from 'chalk';
import { isValidPackageName, isValidConfigAtPath } from '@codeshift/validator';

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
      await isValidConfigAtPath(basePath);

      const subDirectories = await fs.readdir(basePath);
      subDirectories
        .filter(dir => !junk.is(dir))
        .forEach(async subDir => {
          const subPath = path.join(basePath, subDir);

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

(async function() {
  try {
    main(process.argv[2]);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
})();
