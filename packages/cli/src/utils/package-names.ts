export function getCodeshiftPackageName(packageName: string) {
  return `@hypermod/mod-${packageName.replace('@', '').replace('/', '__')}`;
}
