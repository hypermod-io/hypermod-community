import { exec } from 'child_process';

export default function buildPackages(path: string, packages: string[]) {
  return Promise.all(
    packages.map(
      pkg =>
        new Promise<string>((resolve, reject) => {
          exec(
            `yarn build`,
            { cwd: `${path}/${pkg}` },
            (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error for package ${pkg}\n${error}`);
                console.error(stdout);
                console.error(stderr);
                reject(`Unable to build codeshift package: ${pkg}\n${error}`);
              }

              resolve(stdout ? stdout : stderr);
            },
          );
        }),
    ),
  );
}
