import simpleGit from 'simple-git/promise';
import fs from 'fs-extra';

export default async function getChangedPackages() {
  const git = simpleGit();

  const eventMeta = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH!, 'utf8'),
  );

  try {
    await git.revparse(['--verify', eventMeta.before]);
  } catch (e) {
    throw new Error(`Invalid git ref detected in ref: "${eventMeta.before}"`);
  }

  const diff = await git.diff([
    '--name-only',
    eventMeta.before,
    eventMeta.after,
  ]);

  return diff
    .split('\n')
    .filter(path => !!path && path.startsWith('community/'))
    .map(path => path.split('/')[1])
    .filter((path, i, self) => self.indexOf(path) === i);
}
