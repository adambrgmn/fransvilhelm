const { createJestConfig } = require('@fransvilhelm/config');

module.exports = createJestConfig('jsdom', (config) => {
  config.collectCoverageFrom.push('!**/src/Icons.tsx');
  return config;
});
