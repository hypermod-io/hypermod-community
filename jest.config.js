module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '^.+\\.(spec|test)\\.(ts|js)$',
  snapshotSerializers: ['jest-serializer-html-string'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
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
