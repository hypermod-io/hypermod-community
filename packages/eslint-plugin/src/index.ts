import renameProp from './rules/rename-prop';
import changeComposition from './rules/change-composition';
import sortImports from './rules/sort-imports';
import noCodemodComment from './rules/no-codemod-comment';

export const rules = {
  /**
   * Remove or update a jsx prop
   */
  'jsx/update-prop-name': renameProp,
  /**
   * Remove or update import
   */
  'update-import': renameProp,
  /**
   * Update jsx prop value
   */
  'jsx/update-prop-value': renameProp,
  /**
   * Has codemod TODO
   */
  'no-codemod-comment': noCodemodComment,
  'change-composition': changeComposition,
  'sort-imports': sortImports,
};

export { hash } from './hash';
