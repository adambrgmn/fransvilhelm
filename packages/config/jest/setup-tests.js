const failOnConsole = require('jest-fail-on-console');

if (process.env.CI === 'true') {
  failOnConsole();
}
