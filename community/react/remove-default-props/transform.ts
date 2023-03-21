import { FileInfo, API } from 'jscodeshift';
import { moveDefaultPropsToFunctionDeclaration } from './motions/moveDefaultPropsToFunctionDeclaration';
import { removeDefaultPropsAssignment } from './motions/removeDefaultPropsAssignment';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const source = j(file.source);

  // Find all function declarations with name "Component"
  moveDefaultPropsToFunctionDeclaration(source, j);

  removeDefaultPropsAssignment(source, j);

  return source.toSource();
}
