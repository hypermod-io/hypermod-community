export default {
  maintainers: ['danieldelcore'],
  transforms: {
    '11.0.0': require.resolve('./11.0.0/transform'),
  },
  presets: {
    'styled-to-emotion-10': require.resolve('./styled-to-emotion-10/transform'),
  },
};
