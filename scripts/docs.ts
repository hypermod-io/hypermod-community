import fs from 'fs-extra';
import junk from 'junk';
import path from 'path';

import { CodeshiftConfig } from '@hypermod/types';
import { fetchConfig } from '@hypermod/fetcher';

const COMMUNITY_PATH = path.join(__dirname, '..', 'community');
const DOCS_PATH = path.join(
  __dirname,
  '..',
  'website',
  'docs',
  'registry-generated',
);

function cleanTargetDir(targetPath: string) {
  if (fs.existsSync(targetPath)) fs.emptyDirSync(targetPath);
}

function getReadme(transformSourcePath: string) {
  const readmeFilePath = path.join(
    COMMUNITY_PATH,
    transformSourcePath,
    'README.md',
  );

  const readmeRaw = fs.existsSync(readmeFilePath)
    ? fs.readFileSync(readmeFilePath, 'utf-8')
    : '';

  // remove first line
  const readme = readmeRaw.trim().split('\n');
  readme.shift();
  return readme.join('\n').trim();
}

function renderTransform(
  id: string,
  packageName: string,
  type: 'transform' | 'preset',
  safePackageName: string,
  urlSafePackageName: string,
  packageLink: string,
) {
  const seperator = type === 'transform' ? '@' : '#';
  const readme = getReadme(`${packageName}/src/${id}`);
  const fallback =
    type === 'transform'
      ? `A codemod which facilitates the migration of the ${packageLink} package to version ${id}.`
      : '';

  return `### ${id}

:::info
[Source](https://github.com/hypermod-io/hypermod-community/tree/main/community/${urlSafePackageName}) | [Report an issue](https://github.com/hypermod-io/hypermod-community/issues/new?title=${safePackageName}@${id})

**Usage** \`$ hypermod --packages ${packageName}${seperator}${id} path/to/source\`
:::

${readme ? readme : fallback}
`;
}

interface DocsData {
  name: string;
  config: CodeshiftConfig;
}

async function main() {
  const communityCodemods = fs.readdirSync(COMMUNITY_PATH);
  const data: DocsData[] = [];
  const directories = communityCodemods.filter(dir => junk.not(dir));

  for (const dir of directories) {
    const { config } = await fetchConfig(path.join(COMMUNITY_PATH, dir));

    if (!config) {
      throw new Error(`Unable to locate config for path: ${dir}`);
    }

    data.push({ name: dir, config });
  }

  cleanTargetDir(DOCS_PATH);

  console.log(data);

  data.forEach(({ name, config }) => {
    const safeName = name.replace('@', '');
    const safeRawName = safeName.replace('__', '/');
    const rawName = name.replace('__', '/');
    const urlSafeName = encodeURIComponent(name);
    const packageLink = `[${rawName}](https://www.npmjs.com/package/${rawName})`;

    fs.outputFileSync(
      path.join(DOCS_PATH, `${name}.mdx`),
      `---
id: ${safeName}
title: ${safeRawName}
slug: /registry/${safeName}
keywords: [codemods, ${safeRawName}, code evolution, code migration, package updates, automated code updates]
description: Explore codemods for ${rawName}.
---

${
  config.targets?.length
    ? `**Target package(s):**

${config
  .targets!.map(
    target => `- [${target}](https://www.npmjs.com/package/${target})`,
  )
  .join('\n')}
`
    : ''
}

${
  config.maintainers?.length
    ? `**Maintainers:**

${config
  .maintainers!.map(
    maintainer => `- [${maintainer}](https://github.com/${maintainer})`,
  )
  .join('\n')}

`
    : ''
}
${
  config.transforms && Object.keys(config.transforms).length
    ? `
## Transforms

${Object.keys(config.transforms)
  .map(key =>
    renderTransform(key, name, 'transform', safeName, urlSafeName, packageLink),
  )
  .join('')}
`
    : ''
}

${
  config.presets && Object.keys(config.presets).length
    ? `
## Presets

${Object.keys(config.presets)
  .map(key =>
    renderTransform(key, name, 'preset', safeName, urlSafeName, packageLink),
  )
  .join('')}
`
    : ''
}
`,
    );
  });
}

main();
