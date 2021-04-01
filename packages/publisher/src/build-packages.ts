import { exec } from 'child_process';

export default async function buildPackages() {
  exec('yarn build');
}
