module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '^.+\\.spec\\.(ts|js)$',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
