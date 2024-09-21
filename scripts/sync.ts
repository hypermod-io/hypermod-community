import fs from 'fs-extra';
import junk from 'junk';
import path from 'path';
import axios from 'axios';

import { fetchConfig } from '@hypermod/fetcher';

const COMMUNITY_PATH = path.join(__dirname, '..', 'community');
const CODESHIFT_WORKER_URL = 'http://codeshift.delcore.workers.dev/packages';

interface DocsData {
  pkgName: string;
  targets: string;
}

async function main() {
  console.log('🚚 Syncing community packages with the hypermod worker');

  const communityCodemods = fs.readdirSync(COMMUNITY_PATH);
  const data: DocsData[] = [];
  const directories = communityCodemods.filter(dir => junk.not(dir));

  for (const dir of directories) {
    const configMeta = await fetchConfig(path.join(COMMUNITY_PATH, dir));

    if (!configMeta) {
      throw new Error(`Unable to locate config for path: ${dir}`);
    }

    const pkgName = `@hypermod/mod-${dir.replace('@', '').replace('/', '__')}`;
    const rawPkgName = dir.replace('__', '/');
    data.push({
      pkgName,
      targets:
        rawPkgName +
        (configMeta.config.targets ? `, ${configMeta.config.targets}` : ''),
    });
  }

  const response = await axios.post(
    CODESHIFT_WORKER_URL,
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-PSK': process.env.WORKER_PRESHARED_KEY!,
      },
    },
  );

  console.log(response.data);
}

main().catch(error => {
  console.error('Syncing error:', error.message);
  process.exit(1);
});
