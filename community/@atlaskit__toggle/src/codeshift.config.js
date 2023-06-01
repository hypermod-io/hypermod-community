module.exports = {
  maintainers: ['danieldelcore'],
  targets: ['@atlaskit/toggle'],
  transforms: {
    '11.0.0': require.resolve('./11.0.0/transform'),
    '12.0.0': require.resolve('./12.0.0/transform'),
  },
};
