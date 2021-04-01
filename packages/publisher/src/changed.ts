import simpleGit from 'simple-git/promise';

export default async function getChangedPackages() {
  const git = simpleGit();
  let commit: string;

  try {
    commit = await git.revparse(['--verify', process.env.GITHUB_SHA!]);
  } catch (e) {
    throw new Error(`Invalid git ref "${process.env.GITHUB_SHA}"`);
  }

  const diff = await git.diff(['--name-only', commit, 'HEAD']);

  return diff
    .split('\n')
    .filter(path => !!path && path.startsWith('community/'))
    .map(path => path.split('/')[1])
    .filter((path, i, self) => self.indexOf(path) === i);
}
