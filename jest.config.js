/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        diagnostics: { ignoreCodes: [1343] },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: { url: 'https://www.url.com' },
              },
            },
          ],
        },
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
    '(.+)\\.js$': '$1',
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
