module.exports = {
  maintainers: ['danieldelcore'],
  targets: ['@atlaskit/avatar'],
  transforms: {
    '18.0.0': require('./18.0.0/transform'),
    '19.0.0': require('./19.0.0/transform'),
  },
};
