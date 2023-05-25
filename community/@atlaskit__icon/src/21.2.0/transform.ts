import core, {
  API,
  FileInfo,
  Options,
  Collection,
  ImportSpecifier,
  ImportDefaultSpecifier,
  ASTPath,
} from 'jscodeshift';
import { hasImportDeclaration } from '@codeshift/utils';

const packageName = '@atlaskit/icon';

function tryCreateImport({
  j,
  base,
  relativeToPackage,
  packageName,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  relativeToPackage: string;
  packageName: string;
}) {
  const exists: boolean =
    base
      .find(j.ImportDeclaration)
      .filter(path => path.value.source.value === packageName).length > 0;

  if (exists) {
    return;
  }

  base
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value === relativeToPackage)
    .insertBefore(j.importDeclaration([], j.literal(packageName)));
}

function addToImport({
  j,
  base,
  importSpecifier,
  packageName,
}: {
  j: core.JSCodeshift;
  base: Collection<any>;
  importSpecifier: ImportSpecifier | ImportDefaultSpecifier;
  packageName: string;
}) {
  base
    .find(j.ImportDeclaration)
    .filter(path => path.value.source.value === packageName)
    .replaceWith(declaration => {
      return j.importDeclaration(
        [
          // we are appending to the existing specifiers
          // We are doing a filter hear because sometimes specifiers can be removed
          // but they hand around in the declaration
          ...(declaration.value.specifiers || []).filter(
            item => item.type === 'ImportSpecifier' && item.imported != null,
          ),
          importSpecifier,
        ],
        j.literal(packageName),
      );
    });
}

export default function transformer(
  fileInfo: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(fileInfo.source);

  if (!hasImportDeclaration(j, source, packageName)) {
    return fileInfo.source;
  }

  source
    .find(j.ImportSpecifier, {
      imported: { name: 'metadata' },
    })
    .forEach((p: ASTPath<ImportSpecifier | ImportDefaultSpecifier>) => {
      if (p.parentPath.parentPath.node.source.value !== packageName) {
        return;
      }
      if (p.parentPath.node.specifiers.length === 1) {
        p.node.type = 'ImportDefaultSpecifier';
        p.parentPath.node.source.value = `${packageName}/metadata`;
      } else if (p.node.local) {
        tryCreateImport({
          j,
          base: source,
          packageName: `${packageName}/metadata`,
          relativeToPackage: packageName,
        });

        addToImport({
          j,
          base: source,
          packageName: `${packageName}/metadata`,
          importSpecifier: j.importDefaultSpecifier(
            j.identifier(p.node.local.name),
          ),
        });
        p.replace();
      }
    });

  /**
   * Return your modified AST here 👇
   * -----
   * This is where your modified AST will be transformed back into a string
   * and written back to the file.
   */
  return source.toSource(options.printOptions);
}
