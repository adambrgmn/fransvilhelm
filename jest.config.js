module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setup-tests.js',
    'react-testing-library/cleanup-after-each',
  ],
};
