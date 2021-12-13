module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setup-tests.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.docz/'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!src/index.ts',
    '!**/*.example.tsx',
    '!**/*.d.ts',
  ],
};
