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
    'React-PropTypes-to-prop-types': require.resolve(
      './React-PropTypes-to-prop-types/transform',
    ),
    'ReactNative-View-propTypes': require.resolve(
      './ReactNative-View-propTypes/transform',
    ),
    class: require.resolve('./class/transform'),
    'create-element-to-jsx': require.resolve(
      './create-element-to-jsx/transform',
    ),
    'rename-unsafe-lifecycles': require.resolve(
      './rename-unsafe-lifecycles/transform',
    ),
    'manual-bind-to-arrow': require.resolve('./manual-bind-to-arrow/transform'),
    'pure-component': require.resolve('./pure-component/transform'),
    'react-to-react-dom': require.resolve('./react-to-react-dom/transform'),
    'error-boundaries': require.resolve('./error-boundaries/transform'),
    'React-DOM-to-react-dom-factories': require.resolve(
      './React-DOM-to-react-dom-factories/transform',
    ),
  },
};
