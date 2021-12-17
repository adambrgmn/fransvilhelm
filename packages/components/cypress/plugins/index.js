/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  if (config.testingType === 'component') {
    require('@cypress/react/plugins/babel')(on, config, {
      setWebpackConfig: (config) => {
        for (let rule of config.module.rules ?? []) {
          if (rule.loader === 'babel-loader') {
            rule.options = {
              babelrc: false,
              presets: [
                ['@babel/preset-env', { targets: { esmodules: true } }],
                '@babel/preset-typescript',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: ['istanbul'],
            };
          }
        }

        return config;
      },
    });
  }

  return config;
};
