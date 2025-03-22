import renameProp from './rules/rename-prop';
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
   * Has codemod TODO
   */
  'no-codemod-comment': noCodemodComment,
};
