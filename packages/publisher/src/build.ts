import { exec } from 'child_process';

export default function buildPackages(path: string, packages: string[]) {
  return Promise.all(
    packages.map(
      pkg =>
        new Promise<void>((resolve, reject) => {
          // TODO: stop this from building the entire repo.
          exec(
            `echo $PWD && cd ${path}/${pkg} && yarn build`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                reject('Unable to build codeshift packages');
                return;
              }

              if (stderr) {
                console.error(stderr);
              }

              console.log(stdout);

              resolve();
            },
          );
        }),
    ),
  );
}
