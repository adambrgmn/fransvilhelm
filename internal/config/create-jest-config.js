const path = require('path');

const _ = require('lodash');

/**
 * @typedef {import('@jest/types').Config.InitialOptions} JestConfig
 * @typedef {(config: JestConfig) => JestConfig} OverrideFn
 */

/**
 * @param {'node' | 'jsdom'} env
 * @param {JestConfig | OverrideFn} override
 */
exports.createJestConfig = function createJestConfig(env, override) {
  /** @type {JestConfig} */
  let base = {
    testEnvironment: env,
    setupFilesAfterEnv: [path.join(__dirname, './jest/setup-tests.js')],
    coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
    collectCoverageFrom: [
      '**/src/**/*.{js,jsx}',
      '**/src/**/*.{ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/coverage/**',
      '!**/test-utils/**',
    ],
    coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'],
    coverageThreshold: {
      global: {
        branches: 75,
        functions: 95,
        lines: 95,
        statements: -20,
      },
    },
  };

  /** @type {JestConfig | undefined} */
  let envConfig = {};

  if (env === 'jsdom') {
    envConfig = {
      setupFilesAfterEnv: ['@testing-library/jest-dom'],
    };
  } else if (env === 'node') {
    envConfig = {};
  }

  if (typeof override === 'function') {
    return override(_.merge(base, envConfig));
  }

  return _.merge(base, envConfig, override);
};
