module.exports = {
  maintainers: [],
  targets: [],
  description: 'Codemods for javascript',
  transforms: {},
  presets: {
    'import-from-root': require.resolve('./import-from-root/transform'),
    'remove-debugger': require.resolve('./remove-debugger/transform'),
    'sort-object-props': require.resolve('./sort-object-props/transform'),
    'use-named-exports': require.resolve('./use-named-exports/transform'),
    'use-named-imports': require.resolve('./use-named-imports/transform'),
    'var-to-let': require.resolve('./var-to-let/transform'),
  },
};
