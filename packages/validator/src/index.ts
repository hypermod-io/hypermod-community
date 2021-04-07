import fs, { lstatSync, existsSync } from 'fs-extra';
import semver from 'semver';

const packageNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*__)?[a-z0-9-~][a-z0-9-._~]*$/;

async function main(path: string) {
  const directories = await fs.readdir(path);

  directories.forEach(async dir => {
    if (!dir.match(packageNameRegex)) {
      throw new Error(
        `Invalid package name: ${dir}.
        If this is a scoped package, please make sure rename the folder to use the "__" characters to denote submodule.
        For example: @atlaskit/avatar => @atlaskit__avatar`,
      );
    }

    const subDirectories = await fs.readdir(`${path}/${dir}`);
    let hasConfigFile = false;

    subDirectories.forEach(subDir => {
      if (subDir === 'codeshift.config.js') {
        hasConfigFile = true;
      }

      if (
        lstatSync(`${path}/${dir}/${subDir}`).isDirectory() &&
        !semver.valid(subDir)
      ) {
        throw new Error(
          `Codemod folder name "${subDir}" has an invalid version name. Please make sure the file name is valid semver. For example "18.0.0"`,
        );
      }

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

    if (!hasConfigFile) {
      throw new Error(
        `No config file found at: ${path}/${dir}.
        Please create a config file named "codeshift.config.js"`,
      );
    }
  });
}

main(process.argv[2]);
