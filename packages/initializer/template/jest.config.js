module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '^.+\\.spec\\.(tsx|ts|js)$',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
