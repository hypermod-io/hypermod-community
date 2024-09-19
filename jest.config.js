/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '^.+\\.(spec|test)\\.(ts|js)$',
  snapshotSerializers: ['jest-serializer-html-string'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '@hypermod/(.*)$': '<rootDir>/packages/$1/src',
    '@codeshift/(.*)$': '<rootDir>/packages/$1/src',
  },
  testPathIgnorePatterns: [
    '.tmp/',
    '/node_modules/',
    '/plugin_packages/',
    '<rootDir>/packages/initializer/template/',
  ],
};
