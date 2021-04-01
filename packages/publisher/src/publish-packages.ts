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
  return new Promise<string>((resolve, reject) =>
    client.publish(
      npmUri + packageName,
      {
        metadata,
        access,
        body,
        auth: { token },
      },
      (
        error: any,
        data: { 'dist-tags': { latest: string } },
        _raw: any,
        res: { statusCode: number },
      ) => {
        if (res && res.statusCode === 404) return resolve('0.0.0');
        if (error) reject(`Unexpected error when contacting NPM: ${error}`);
        return resolve(data['dist-tags'].latest);
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

      await tar.create({ file: tarballPath }, [distPath]);

      publishPackage(packageName, {
        // @ts-ignore
        metadata: JSON.parse(packageJson),
        access: 'public',
        body: fs.createReadStream(tarballPath),
        token: authToken,
      });
    }),
  );
}
