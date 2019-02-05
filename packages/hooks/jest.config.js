const base = require('../../configs/jest.config.base');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
};
