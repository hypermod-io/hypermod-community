export function getCodeshiftPackageName(packageName: string) {
  return `@codeshift/mod-${packageName.replace('@', '').replace('/', '__')}`;
}
