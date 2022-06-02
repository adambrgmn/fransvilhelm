module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: '@storybook/react',
  babel: (config) => {
    config.plugins.push(require.resolve('babel-plugin-istanbul'));
    return config;
  },
};
