import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';

interface MarketPlaceEntry {
  id: string;
  slug: string;
  description: string;
  status: string;
  tags: string[];
  type: 'OPTIMIZATION' | 'MIGRATION';
  transformId: string;
  transform: Transform;
}

interface Transform {
  author: { image: string; name: string };
  id: string;
  name: string;
  sources: Source[];
}

interface Source {
  id: string;
  name: string;
  code: string;
}

function writeSourceFiles(slug: string, transform: Transform, dir: string) {
  transform.sources.forEach(source => {
    const filePath = path.join(dir, slug, source.name);
    fs.outputFileSync(filePath, source.code);
  });
}

export async function fetchHmPkg(slug: string, dir: string) {
  const spinner = ora(
    `${chalk.green('Attempting to download Hypermod transform:')} ${slug}`,
  ).start();

  let marketplaceEntry: MarketPlaceEntry;

  try {
    // @ts-expect-error
    marketplaceEntry = await fetch(
      `https://www.hypermod.io/api/cli/transforms/${slug.replace('hm-', '')}`,
    ).then((res: any) => {
      if (res.status === 404) {
        throw new Error(`Transform not found: ${slug}`);
      }

      if (res.status === 403) {
        throw new Error(`Access forbidden for transform: ${slug}`);
      }

      if (!res.ok) {
        throw new Error(`Error fetching transform: ${res.statusText}`);
      }

      return res.json();
    });

    spinner.succeed(
      `${chalk.green(
        'Found Hypermod transform:',
      )} https://www.hypermod.io/explore/${slug}`,
    );
  } catch (error) {
    spinner.fail(`${chalk.red('Unable to fetch Hypermod transform:')} ${slug}`);
    throw new Error(`Unable to locate Hypermod transform: ${slug}\n${error}`);
  }

  writeSourceFiles(slug, marketplaceEntry.transform, dir);

  return marketplaceEntry;
}
