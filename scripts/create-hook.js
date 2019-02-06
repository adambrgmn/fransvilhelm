/* eslint-disable @typescript-eslint/no-var-requires, strict */
'use strict';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { toCamelCase, toKebabCase } = require('strman');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const moduleTemplate = ({ name }) => `import * as React from 'react';

const ${toCamelCase(name)} = () => {};

export { ${toCamelCase(name)} };
`;

const testTemplate = ({ name }) => `import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ${toCamelCase(name)} } from '../${toKebabCase(name)}';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const result = ${toCamelCase(name)}();
  return <p>{result}</p>;
};

it('should ...', () => {
  const doc = render(<TestComponent />);
});
`;

const indexTemplate = ({ name }) => `export * from './${toKebabCase(name)}';`;

const exists = async filePath => {
  try {
    await readFile(filePath);
    return true;
  } catch (error) {
    return false;
  }
};

const createFile = async ({ path, content }) => {
  await writeFile(path, content, 'utf-8');
};

const updateIndex = async ({ name }) => {
  const indexPath = path.join(__dirname, '../src/index.ts');
  const content = await readFile(indexPath, 'utf-8');

  const statements = [
    ...content.trim().split('\n'),
    indexTemplate({ name }),
  ].sort();

  await writeFile(indexPath, statements.join('\n') + '\n', 'utf-8');
};

async function main() {
  try {
    const [, , name] = process.argv;
    const file = {
      module: path.join(__dirname, '../src', `${toKebabCase(name)}.ts`),
      test: path.join(
        __dirname,
        '../src/__tests__',
        `${toKebabCase(name)}.tsx`,
      ),
    };

    const moduleExists = await exists(file.module);
    if (moduleExists) throw new Error(`Module ${name} already exists`);

    await Promise.all([
      updateIndex({ name }),
      createFile({ path: file.module, content: moduleTemplate({ name }) }),
      createFile({ path: file.test, content: testTemplate({ name }) }),
    ]);

    console.log(`👍 Created new hook ${name}`);
  } catch (error) {
    console.error('👎 Failed to create new hook');
    console.error(error.message);
  }
}

main();
