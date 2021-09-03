export default {
  maintainers: ['danieldelcore'],
  transforms: {
    '15.0.0': require.resolve('./15.0.0/transform'),
    '15.1.1': require.resolve('./15.1.1/transform'),
  },
};
