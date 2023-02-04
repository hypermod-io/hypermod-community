const reFilePath = /.+\/+/;
const reExtensions = /\..+/;
const reNonCamelCasing = /[-_ ]([a-z])/g;

export const getName = file =>
  file.path
    .replace('/index', '')
    .replace(reFilePath, '')
    .replace(reExtensions, '');

export const getNameInCamelCase = file =>
  getName(file).replace(reNonCamelCasing, $1 => $1.charAt(1).toUpperCase());

export const getNameInPascalCase = file =>
  getNameInCamelCase(file).charAt(0).toUpperCase() +
  getNameInCamelCase(file).slice(1);
