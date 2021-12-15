const path = require('path');

module.exports = {
  setupFilesAfterEnv: [path.join(__dirname, './jest/setup-tests.js')],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
    '**/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/test-utils/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 95,
      lines: 95,
      statements: -20,
    },
  },
};
