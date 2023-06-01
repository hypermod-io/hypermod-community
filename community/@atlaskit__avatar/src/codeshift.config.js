module.exports = {
  maintainers: ['danieldelcore'],
  targets: ['@atlaskit/avatar'],
  transforms: {
    '18.0.0': require.resolve('./18.0.0/transform'),
    '19.0.0': require.resolve('./19.0.0/transform'),
  },
};
