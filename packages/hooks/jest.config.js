module.exports = {
  preset: '@fransvilhelm/config',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setup-tests.ts',
  ],
};
