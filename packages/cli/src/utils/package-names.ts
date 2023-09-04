export function getHypermodPackageName(packageName: string) {
  return `@hypermod/mod-${packageName.replace('@', '').replace('/', '__')}`;
}
