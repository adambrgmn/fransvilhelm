module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setup-tests.js',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!src/index.ts',
    '!**/*.example.tsx',
    '!**/*.d.ts',
  ],
};
