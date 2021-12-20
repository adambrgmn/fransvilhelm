import * as fs from 'fs/promises';
import * as path from 'path';

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  const kebabCase = plop.getHelper('kebabCase');

  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'package name please',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/{{name}}',
        templateFiles: '.plop/package/**/*',
        base: '.plop/package',
      },
    ],
  });

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
        destination: 'packages/hooks/src/{{kebabCase name}}',
        templateFiles: '.plop/hook/**/*',
        base: '.plop/hook',
      },
      {
        type: 'append-sorted',
        path: 'packages/hooks/src/index.ts',
        template: "export * from './{{ kebabCase name }}';\n",
      },
    ],
  });

  plop.setGenerator('component', {
    description: 'Create everything related to a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: 'packages/components/src/{{pascalCase name}}',
        templateFiles: '.plop/component/**/*',
        base: '.plop/component',
      },
      {
        type: 'append-sorted',
        path: 'packages/components/src/index.ts',
        template: "export * from './{{ pascalCase name }}';\n",
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
}
