import { exec } from 'child_process';

export default function buildPackages() {
  return new Promise<void>((resolve, reject) => {
    exec('yarn build', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject('Unable to build codeshift packages');
      }

      console.log(stdout);
      console.error(stderr);

      resolve();
    });
  });
}
