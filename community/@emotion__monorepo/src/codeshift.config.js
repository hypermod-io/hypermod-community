module.exports = {
  maintainers: ['danieldelcore'],
  targets: [
    '@emotion/babel-plugin',
    '@emotion/core',
    '@emotion/css',
    '@emotion/css/create-instance',
    '@emotion/eslint-plugin',
    '@emotion/jest',
    '@emotion/react',
    '@emotion/server',
    '@emotion/server/create-instance',
    'babel-plugin-emotion',
    'create-emotion-server',
    'create-emotion',
    'emotion-server',
    'emotion-theming',
    'emotion',
    'eslint-plugin-emotion',
    'jest-emotion',
  ],
  transforms: {
    '11.0.0': require('./11.0.0/transform'),
  },
  presets: {
    'styled-to-emotion-10': require('./styled-to-emotion-10/transform'),
  },
};
