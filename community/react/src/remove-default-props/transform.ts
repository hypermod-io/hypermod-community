import { FileInfo, API } from 'jscodeshift';
import { applyMotions } from '@hypermod/utils';

import { moveDefaultPropsToArrowFunctionExpression } from './motions/moveDefaultPropsToArrowFunctionExpression';
import { moveDefaultPropsToFunctionDeclaration } from './motions/moveDefaultPropsToFunctionDeclaration';
import { removeDefaultPropsAssignment } from './motions/removeDefaultPropsAssignment';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  applyMotions(j, source, [
    moveDefaultPropsToFunctionDeclaration,
    moveDefaultPropsToArrowFunctionExpression,
    removeDefaultPropsAssignment,
  ]);

  return source.toSource();
}
