export interface Config {
  /**
   * Targets represent the packages that the hypermod package is providing transforms to.
   * This is useful for filtering and grouping codemods based on the target package.
   *
   * For example, a hypermod package that is targetting react and react-dom would have
   * the following targets: ['react', 'react-dom'].
   */
  targets?: string[];

  /**
   * Github usernames of the maintainers
   */
  maintainers?: string[];

  /**
   * Description of the hypermod package, please explain the intetion of the package.
   */
  description?: string;

  /**
   * Transforms are the main building blocks of a codemod. When a hypermod package
   * is targetting a specific package / focus area, transforms represent the
   * migrations between versions of the target package.
   *
   * Example react v16 -> v17, or react-dom v16 -> v17
   */
  transforms?: Record<string, string>;

  /**
   * Presets represent transforms that have no association with a specific
   * version of a package / focus area. These should be generic and reusable.
   *
   * Example: Format imports, remove console logs, etc.
   */
  presets?: Record<string, string>;

  /**
   * A list of dependencies to be installed before running the transform.
   * These are useful when co-locating codemods with an existing package
   * and want to whitelist devDependencies to be installed.
   *
   * Note: the versions installed are based on the package.json
   *
   * Example: dependencies: ['@hypermod/utils', 'postcss', 'postcss-less']
   */
  dependencies?: string[];
}

export type CodeshiftConfig = Config;
