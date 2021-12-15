module.exports = {
  preset: '@fransvilhelm/config',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/src/setup-tests.ts',
  ],
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx}',
    '**/src/**/*.{ts,tsx}',
    '!**/src/Icons.tsx',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/test-utils/**',
  ],
};
