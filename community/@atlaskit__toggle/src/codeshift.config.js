module.exports = {
  maintainers: ['danieldelcore'],
  targets: ['@atlaskit/toggle'],
  transforms: {
    '11.0.0': require('./11.0.0/transform'),
    '12.0.0': require('./12.0.0/transform'),
  },
};
