const path = require('path');

module.exports = {
  setupFilesAfterEnv: [path.join(__dirname, './jest/setup-tests.js')],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!src/index.ts', '!**/*.d.ts'],
};
