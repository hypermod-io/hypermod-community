module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '^.+\\.spec\\.(ts|js)$',
  testPathIgnorePatterns: ['/node_modules/', 'lib'],
  snapshotSerializers: ['jest-serializer-html-string'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@codeshift/(.*)$': '<rootDir>/packages/$1/src',
  },
};
