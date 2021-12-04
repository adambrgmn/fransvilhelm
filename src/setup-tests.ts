import failOnConsole from 'jest-fail-on-console';

if (process.env.CI === 'true') {
  failOnConsole();
}
