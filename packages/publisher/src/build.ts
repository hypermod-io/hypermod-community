import { exec } from 'child_process';

export default function buildPackages(path: string, packages: string[]) {
  return Promise.all(
    packages.map(
      pkg =>
        new Promise<void>((resolve, reject) =>
          exec(
            `yarn build`,
            { cwd: `${path}/${pkg}` },
            (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error for package ${pkg}\n${error}`);
                reject(`Unable to build codeshift package: ${pkg}\n${error}`);
                return;
              }

              if (stderr) {
                console.error(stderr);
              }

              console.log(stdout);

              resolve();
            },
          ),
        ),
    ),
  );
}
