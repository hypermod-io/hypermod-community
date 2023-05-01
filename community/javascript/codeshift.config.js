module.exports = {
  maintainers: ['danieldelcore'],
  targets: [],
  description: 'Codemods for javascript',
  transforms: {},

  presets: {
    'remove-console-log': require.resolve('./remove-console-log/transform'),
    'remove-debugger': require.resolve('./remove-debugger/transform'),
    'sort-object-props': require.resolve('./sort-object-props/transform'),
    'var-to-let': require.resolve('./var-to-let/transform'),
    'no-unused-vars': require.resolve('./no-unused-vars/transform'),
  },
};
