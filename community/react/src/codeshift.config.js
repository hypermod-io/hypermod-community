module.exports = {
  maintainers: [],
  targets: ['react', 'react-dom'],
  description: 'Codemods for react',
  transforms: {},
  presets: {
    'add-react-import': require('./add-react-import/transform'),
    'create-element-to-jsx': require('./create-element-to-jsx/transform'),
    'error-boundaries': require('./error-boundaries/transform'),
    'remove-default-props': require('./remove-default-props/transform'),
    'remove-prop-types': require('./remove-prop-types/transform'),
    'rename-unsafe-lifecycles': require('./rename-unsafe-lifecycles/transform'),
    'sort-jsx-props': require('./sort-jsx-props/transform'),
    'use-string-literal-props': require('./use-string-literal-props/transform'),
  },
};
