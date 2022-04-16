import fs from 'fs-extra';
import junk from 'junk';
import path from 'path';

import { CodeshiftConfig } from '@codeshift/types';
import { fetchConfig } from '@codeshift/fetcher';

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

interface DocsData {
  name: string;
  config: CodeshiftConfig;
}

async function main() {
  const communityCodemods = fs.readdirSync(COMMUNITY_PATH);
  const data: DocsData[] = [];
  const directories = communityCodemods.filter(dir => junk.not(dir));

  for (const dir of directories) {
    const config = await fetchConfig(path.join(COMMUNITY_PATH, dir));

    if (!config) {
      throw new Error(`Unable to locate config for path: ${dir}`);
    }

    data.push({ name: dir, config });
  }

  cleanTargetDir(DOCS_PATH);

  console.log(data);

  data.forEach(({ name, config }) => {
    const safeName = name.replace('@', '');
    const rawName = name.replace('__', '/');
    const urlSafeName = encodeURIComponent(name);
    const packageLink = `[${rawName}](https://www.npmjs.com/package/${rawName})`;

    fs.outputFileSync(
      path.join(DOCS_PATH, `${name}.mdx`),
      `---
id: ${safeName}
title: ${safeName.replace('__', '/')}
slug: /registry/${safeName}
---

**Target package:** ${packageLink}

**Maintainers:**

${config.maintainers!.map(
  maintainer => `- [${maintainer}](https://github.com/${maintainer})`,
)}

${
  config.transforms
    ? `
## Transforms

${Object.keys(config.transforms)
  .map(
    key => `### ${key}

[Source](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community/${urlSafeName}) | [Report an issue](https://github.com/CodeshiftCommunity/CodeshiftCommunity/issues/new?title=${safeName}@${key})

Migrates ${packageLink} to version ${key}.

#### Usage

\`\`\`
$ codeshift --packages ${name}@${key} path/to/source
\`\`\`
`,
  )
  .join('')}
`
    : ''
}

${
  config.presets
    ? `
## Presets

${Object.keys(config.presets)
  .map(
    key => `### ${key}

[Source](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community/${urlSafeName}) | [Report an issue](https://github.com/CodeshiftCommunity/CodeshiftCommunity/issues/new?title=${safeName}@${key})

#### Usage

\`\`\`
$ codeshift --packages ${name}#${key} path/to/source
\`\`\`
`,
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
