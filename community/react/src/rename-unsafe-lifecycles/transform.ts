import { API, FileInfo, Options } from 'jscodeshift';

const DEPRECATED_APIS = Object.create(null);
DEPRECATED_APIS.componentWillMount = 'UNSAFE_componentWillMount';
DEPRECATED_APIS.componentWillReceiveProps = 'UNSAFE_componentWillReceiveProps';
DEPRECATED_APIS.componentWillUpdate = 'UNSAFE_componentWillUpdate';

export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: Options,
) {
  const root = j(file.source);

  let hasModifications = false;

  const renameDeprecatedApis = (path: any) => {
    const name = path.node.key.name;

    if (DEPRECATED_APIS[name]) {
      path.value.key.name = DEPRECATED_APIS[name];
      hasModifications = true;
    }
  };

  const renameDeprecatedCallExpressions = (path: any) => {
    const name = path.node.property.name;

    if (DEPRECATED_APIS[name]) {
      path.node.property.name = DEPRECATED_APIS[name];
      hasModifications = true;
    }
  };

  // Class methods
  root.find(j.MethodDefinition).forEach(renameDeprecatedApis);

  // Class methods - typescript
  root.find(j.ClassMethod).forEach(renameDeprecatedApis);

  // Arrow functions
  root.find(j.ClassProperty).forEach(renameDeprecatedApis);

  // createReactClass and mixins
  root.find(j.Property).forEach(renameDeprecatedApis);

  // Function calls
  root.find(j.MemberExpression).forEach(renameDeprecatedCallExpressions);

  return hasModifications ? root.toSource(options.printOptions) : null;
}
