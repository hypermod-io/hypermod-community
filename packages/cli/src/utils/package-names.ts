// hypermod: Run "tsc" to verify the updated @types/jscodeshift@1.0.0 types.
export function getHypermodPackageName(packageName: string) {
  return `@hypermod/mod-${packageName.replace('@', '').replace('/', '__')}`;
}
