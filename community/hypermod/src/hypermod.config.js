module.exports = {
  maintainers: [],
  targets: [],
  description: 'Codemods for hypermod',
  transforms: {},

  presets: {
    'defineInlineTest-to-applyTransform': require('./defineInlineTest-to-applyTransform/transform'),
  },
};
