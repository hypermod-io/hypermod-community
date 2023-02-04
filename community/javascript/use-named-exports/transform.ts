import { API, FileInfo, Options } from 'jscodeshift';

import { getNameInCamelCase, getNameInPascalCase } from './lib/file';
import { extendApi } from './lib/helpers';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const source = j(file.source);

  extendApi(j);

  if (source.find(j.ExportDefaultDeclaration).length === 0) {
    console.log(`%s has no default export`, file.path);
    return;
  }

  const topLevelVarNames = source.getTopLevelVarNames();
  const usesReact = source.getImportsByPackageName('react').length > 0;
  const intendedName = usesReact
    ? getNameInPascalCase(file)
    : getNameInCamelCase(file);
  const caseInsensitiveMatch = name =>
    name.toLowerCase() === intendedName.toLowerCase();
  const existingName = topLevelVarNames.find(caseInsensitiveMatch);
  const nameIsInUse = Boolean(existingName);
  const exportName = existingName || intendedName;

  if (!nameIsInUse) {
    return source
      .find(j.ExportDefaultDeclaration)
      .insertBefore(path => source.exportDefaultAsNamed(path, exportName))
      .replaceWith(() => source.exportVarNameAsDefault(exportName))
      .toSource();
  }

  const classExportOfName = source.getExportsByClassName(exportName);
  const functionExportOfName = source.getExportsByFunctionName(exportName);
  const namedExportOfName = source.getExportsByVarName(exportName);
  const matchingClass = source.getTopLevelClassByName(exportName);
  const matchingFunction = source.getTopLevelFunctionByName(exportName);
  const matchingVariable = source.getTopLevelVariableByName(exportName);

  if (classExportOfName.length > 0) {
    console.log(`%s already exports a class called %s`, file.path, exportName);
    return;
  }

  if (functionExportOfName.length > 0) {
    console.log(
      `%s already exports a function called %s`,
      file.path,
      exportName,
    );
    return;
  }

  if (namedExportOfName.length > 0) {
    console.log(`%s already exports a const called %s`, file.path, exportName);
    return;
  }

  if (matchingClass.length > 0) {
    console.log(
      `%s has a class called %s which is not exported`,
      file.path,
      exportName,
    );
    return matchingClass
      .replaceWith(() => source.exportClass(matchingClass.get()))
      .toSource();
  }

  if (matchingFunction.length > 0) {
    console.log(
      `%s has a function called %s which is not exported`,
      file.path,
      exportName,
    );
    return matchingFunction
      .replaceWith(() => source.exportFunction(matchingFunction.get()))
      .toSource();
  }

  if (matchingVariable.length > 0) {
    console.log(
      `%s has a variable called %s which is not exported`,
      file.path,
      exportName,
    );
    return matchingVariable
      .replaceWith(() => source.exportVariable(matchingVariable.get()))
      .toSource();
  }

  return source.toSource(options.printOptions);
}
