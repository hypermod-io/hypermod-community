import fs from 'fs-extra';

const COMMUNITY_PATH = `${__dirname}/../community`;
const DOCS_PATH = `${__dirname}/../website/docs/explore`;

function cleanTargetDir(path: string) {
  if (fs.existsSync(path)) fs.emptyDirSync(path);
}

interface Config {
  maintainers: string[];
  transforms: {
    [key: string]: any;
  };
  presets: {
    [key: string]: any;
  };
}

interface DocsData {
  name: string;
  config: Config;
}

function main() {
  const communityCodemods = fs.readdirSync(COMMUNITY_PATH);
  const data: DocsData[] = [];

  communityCodemods.forEach(dir => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(`${COMMUNITY_PATH}/${dir}/codeshift.config.js`)
      .default;

    data.push({
      name: dir,
      config,
    });
  });

  cleanTargetDir(DOCS_PATH);

  console.log(data);

  data.forEach(({ name, config }) => {
    const safeName = name.replace('@', '');
    const rawName = name.replace('__', '/');
    const urlSafeName = encodeURIComponent(name);
    const packageLink = `[${rawName}](https://www.npmjs.com/package/${rawName})`;

    fs.outputFileSync(
      `${DOCS_PATH}/${name}.mdx`,
      `---
id: ${safeName}
title: ${safeName.replace('__', '/')}
slug: /${safeName}
---

**Target package:** ${packageLink}

**Maintainers:**
${config.maintainers.map(
  maintainer => `- [${maintainer}](https://github.com/${maintainer})`,
)}

## Transforms

${Object.keys(config.transforms)
  .map(
    key => `### ${key}

[Source](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community/${urlSafeName}) | [Report an issue](https://github.com/CodeshiftCommunity/CodeshiftCommunity/issues/new?title=${safeName}@${key})

Migrates ${packageLink} to version ${key}.

### Usage

\`\`\`
$ @codeshift/cli --packages ${name}@${key} path/to/source
\`\`\`
`,
  )
  .join('')}

${config.presets &&
  `
## Presets

${Object.keys(config.presets)
  .map(
    key => `### ${key}

[Source](https://github.com/CodeshiftCommunity/CodeshiftCommunity/tree/main/community/${urlSafeName}) | [Report an issue](https://github.com/CodeshiftCommunity/CodeshiftCommunity/issues/new?title=${safeName}@${key})

### Usage

\`\`\`
$ @codeshift/cli --packages ${name}#${key} path/to/source
\`\`\`
`,
  )
  .join('')}
`}
`,
    );
  });
}

main();
