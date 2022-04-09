import simpleGit from 'simple-git/promise';
import fs from 'fs-extra';

export function getAllPackages(path: string) {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}

export async function getChangedPackages() {
  const git = simpleGit();
  const eventMeta = JSON.parse(fs.readFileSync(sinceRef!, 'utf8'));

  try {
    await git.revparse(['--verify', eventMeta.before]);
  } catch {
    throw Error(`Invalid git ref detected in ref: "${eventMeta.before}"`);
  }

  const diff = await git.diff([
    '--name-only',
    eventMeta.before,
    eventMeta.after,
  ]);

  return diff
    .split('\n')
    .filter(path => path?.startsWith('community/'))
    .map(path => path.split('/')[1])
    .filter((path, i, self) => self.indexOf(path) === i);
}
