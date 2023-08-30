module.exports = {
  maintainers: ['danieldelcore'],
  targets: [],
  description: 'Codemods for javascript',
  transforms: {},
  presets: {
    'remove-console-log': require('./remove-console-log/transform'),
    'remove-debugger': require('./remove-debugger/transform'),
    'sort-object-props': require('./sort-object-props/transform'),
    'var-to-let': require('./var-to-let/transform'),
    'remove-unused-vars': require('./remove-unused-vars/transform'),
  },
};
