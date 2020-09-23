const path = require('path');
const { promises: fs } = require('fs');

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('docz-index', {
    description: 'Generate Docz index page',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: 'src/index.mdx',
        templateFile: 'README.md',
      },
    ],
  });

  const kebabCase = plop.getHelper('kebabCase');
  plop.setGenerator('hook', {
    description: 'Create everything related to a hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'hook name please (format: use-{hooks-name})',
        filter: (str) => `use-${kebabCase(str.replace(/^use-/, ''))}`,
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'src/{{ kebabCase name }}',
        templateFiles: 'plop-templates/hook/**/*',
        base: 'plop-templates/hook',
      },
      {
        type: 'append-sorted',
        path: 'src/index.ts',
        template: "export * from './{{ kebabCase name }}';\n",
      },
    ],
  });

  plop.setActionType('append-sorted', async (data, userConfig = {}) => {
    const config = { separator: '\n', ...userConfig };
    const base = plop.getDestBasePath();
    const dest = path.join(base, config.path);

    const original = await fs.readFile(dest, 'utf-8');
    const newData = plop.renderString(config.template, data);

    const content = original.trim() + config.separator + newData;

    const sortedContent =
      content
        .trim()
        .split('\n')
        .filter((item, idx, arr) => arr.indexOf(item, idx + 1) < 0)
        .sort()
        .join('\n') + '\n';

    await fs.writeFile(dest, sortedContent);
    return `Appended and sorted ${config.path}`;
  });
};
