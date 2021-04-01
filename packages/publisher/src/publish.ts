import fs from 'fs-extra';
import tar from 'tar';

// @ts-ignore
import RegClient from 'npm-registry-client';

// TODO: dependency inject this instance
const client = new RegClient();
const npmUri = 'https://registry.npmjs.org/';

interface PublishPackageOptions {
  metadata: Record<string, string>;
  access: 'public' | 'restricted';
  token: string;
  body: any;
}

function publishPackage(
  packageName: string,
  { metadata, access, body, token }: PublishPackageOptions,
) {
  return new Promise<void>((resolve, reject) =>
    client.publish(
      npmUri,
      // npmUri + packageName,
      {
        metadata,
        access,
        body,
        auth: { token },
      },
      (error: any) => {
        if (error) {
          reject(
            `Unexpected error when publishing ${packageName} to NPM: ${error}`,
          );
        }
        resolve();
      },
    ),
  );
}

export default function publishPackages(path: string, authToken: string) {
  return Promise.all(
    fs.readdirSync(path).map(async dir => {
      const packageName = `@codeshift/mod-${dir
        .replace('@', '')
        .replace('/', '__')}`;

      const packageJson = await fs.readFile(`${path}/${dir}/package.json`);
      const distPath = `${path}/${dir}/dist`;
      const tarballPath = `${path}/${dir}/tarball.tgz`;

      await tar.create({ file: tarballPath, gzip: true }, [distPath]);

      return publishPackage(packageName, {
        // @ts-ignore
        metadata: JSON.parse(packageJson),
        access: 'public',
        body: fs.createReadStream(tarballPath),
        token: authToken,
      });
    }),
  );
}
