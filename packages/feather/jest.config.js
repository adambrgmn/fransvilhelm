module.exports = {
  preset: '@fransvilhelm/config',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
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
