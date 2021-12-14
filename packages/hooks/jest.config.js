module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setup-tests.ts',
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!src/index.ts', '!**/*.d.ts'],
};
