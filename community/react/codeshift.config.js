module.exports = {
  maintainers: [],
  targets: ['react', 'react-dom'],
  description: 'Codemods for react',
  transforms: {},
  presets: {
    'add-react-import': require.resolve('./add-react-import/transform'),
    'remove-default-props': require.resolve('./remove-default-props/transform'),
    'remove-prop-types': require.resolve('./remove-prop-types/transform'),
    'sort-jsx-props': require.resolve('./sort-jsx-props/transform'),
    'use-string-literal-props': require.resolve(
      './use-string-literal-props/transform',
    ),
  },
};
