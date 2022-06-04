import fs from 'fs-extra';
import chalk from 'chalk';
// @ts-ignore
import spawn from 'spawndamnit';

function jsonParse(input: string) {
  try {
    return JSON.parse(input);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error('error parsing json:', input);
    }
    throw err;
  }
}

async function publish(
  pkg: { dir: string; packageJson: Record<string, any> },
  opts: { dry?: boolean },
  authToken: string,
) {
  const { name, version } = pkg.packageJson;

  console.log(
    `Publishing ${chalk.cyan(`"${name}"`)} at ${chalk.green(`"${version}"`)}`,
  );

  // Due to a super annoying issue in yarn, we have to manually override this env variable
  // See: https://github.com/yarnpkg/yarn/issues/2935#issuecomment-355292633
  const envOverride = {
    npm_config_registry: `//registry.npmjs.org/:_authToken=${authToken}`,
  };

  const publishOpts = ['--access', 'public'];

  if (opts?.dry) {
    publishOpts.push('--dry-run');
  }

  const { code, stdout, stderr } = await spawn(
    'npm',
    ['publish', pkg.dir, '--json', ...publishOpts],
    {
      env: Object.assign({}, process.env, envOverride),
    },
  );

  if (code !== 0) {
    console.log(chalk.cyan(stderr));
    throw new Error(`An error occurred while publishing ${name}`);
  }

  const json = jsonParse(stdout.toString().replace(/[^{]*/, ''));

  if (json.error) {
    throw new Error(
      `An error occurred while publishing ${name}: ${json.error.code}
${json.error.summary}
${json.error.detail ? '\n' + json.error.detail : ''}
      `,
    );
  }
}

export default function publishPackages(
  path: string,
  opts: { dry?: boolean },
  authToken: string,
) {
  return Promise.all(
    fs.readdirSync(path).map(async dir => {
      const packagePath = `${path}/${dir}`;
      const packageJson = await fs.readFile(
        `${packagePath}/package.json`,
        'utf8',
      );

      await publish(
        {
          dir: packagePath,
          packageJson: jsonParse(packageJson),
        },
        opts,
        authToken,
      );
    }),
  ).catch(error => {
    throw new Error(error);
  });
}
