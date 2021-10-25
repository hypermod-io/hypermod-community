import fs, { lstatSync, existsSync } from 'fs-extra';
import { isValidPackageName, isValidConfigAtPath } from '@codeshift/validator';

async function main(path: string) {
  const directories = await fs.readdir(path);

  directories.forEach(async dir => {
    if (!isValidPackageName(dir)) {
      throw new Error(
        `Invalid package name: ${dir}.
        If this is a scoped package, please make sure rename the folder to use the "__" characters to denote submodule.
        For example: @foo/bar => @foo__bar`,
      );
    }

    await isValidConfigAtPath(`${path}/${dir}`);

    const subDirectories = await fs.readdir(`${path}/${dir}`);
    subDirectories.forEach(async subDir => {
      if (
        lstatSync(`${path}/${dir}/${subDir}`).isDirectory() &&
        !existsSync(`${path}/${dir}/${subDir}/transform.ts`) &&
        !existsSync(`${path}/${dir}/${subDir}/transform.js`)
      ) {
        throw new Error(
          `Unable to find transform entry-point for directory "${path}/${dir}/${subDir}". Please ensure you have a valid transform.(ts|js) file containing the entry-point for your codemod`,
        );
      }
    });
  });
}

main(process.argv[2]);
