import { API, FileInfo, Options } from 'jscodeshift';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const removePath = (path: any) => j(path).remove();

  // Obj.proptypes = { ... };
  const isAssigningPropTypes = (e: any) =>
    e.node.left &&
    e.node.left.property &&
    e.node.left.property.name === 'propTypes';

  // import PropTypes from 'prop-types';
  const isImportingFromPropTypes = (e: any) =>
    e.node.source && e.node.source.value === 'prop-types';

  // require('prop-types');
  const isRequiringFromPropTypes = (e: any) =>
    e.node.init &&
    e.node.init.callee &&
    e.node.init.callee.name === 'require' &&
    e.node.init.arguments[0].value === 'prop-types';

  // _defineProperty(obj, 'propTypes', { ... });
  const isDefiningPropType = (e: any) =>
    e.node.expression &&
    e.node.expression.callee &&
    e.node.expression.callee.name === '_defineProperty' &&
    e.node.expression.arguments &&
    e.node.expression.arguments[1] &&
    e.node.expression.arguments[1].original &&
    e.node.expression.arguments[1].original.value === 'propTypes';

  // { propTypes: { foo: PropTypes.string } };
  const isObjectProperty = (e: any) =>
    e.node.key &&
    e.node.key.name === 'propTypes' &&
    e.node.value &&
    e.node.value.type === 'ObjectExpression';

  const withoutAssignment = j(file.source)
    .find(j.AssignmentExpression)
    .filter(isAssigningPropTypes)
    .forEach(removePath)
    .toSource();

  const withoutImport = j(withoutAssignment)
    .find(j.ImportDeclaration)
    .filter(isImportingFromPropTypes)
    .forEach(removePath)
    .toSource();

  const withoutRequire = j(withoutImport)
    .find(j.VariableDeclarator)
    .filter(isRequiringFromPropTypes)
    .forEach(removePath)
    .toSource();

  const withoutDefineProperty = j(withoutRequire)
    .find(j.ExpressionStatement)
    .filter(isDefiningPropType)
    .forEach(removePath)
    .toSource();

  const withoutObjectProperty = j(withoutDefineProperty)
    .find(j.Property)
    .filter(isObjectProperty)
    .forEach(removePath);

  return withoutObjectProperty.toSource(options.printOptions);
}
