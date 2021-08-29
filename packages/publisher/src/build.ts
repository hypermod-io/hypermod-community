import { exec } from 'child_process';

export default function buildPackages(path: string, packages: string[]) {
  return Promise.all(
    packages.map(
      pkg =>
        new Promise<void>((resolve, reject) => {
          exec(
            `yarn build`,
            { cwd: `${path}/${pkg}` },
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
