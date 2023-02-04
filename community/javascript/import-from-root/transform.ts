import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  const { IMPORT_FROM_ROOT = '' } = process.env;

  const matchesUserFilter = importDeclaration =>
    IMPORT_FROM_ROOT &&
    importDeclaration.source.value.startsWith(IMPORT_FROM_ROOT);

  source
    .find(j.ImportDeclaration)
    .filter(path => matchesUserFilter(path.value))
    .forEach(path => {
      const importDeclaration = path.value;
      const paths = importDeclaration.source.value.split('/');
      if (importDeclaration.source.value.startsWith('@')) {
        const [scope, packageName] = paths;
        importDeclaration.source.value = `${scope}/${packageName}`;
      } else {
        const [packageName] = paths;
        importDeclaration.source.value = `${packageName}`;
      }
    });

  return source.toSource(options.printOptions);
}
