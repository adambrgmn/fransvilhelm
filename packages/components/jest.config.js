const { createJestConfig } = require('@fransvilhelm/config');

module.exports = createJestConfig('jsdom', {
  coverageDirectory: 'coverage/jest',
});
