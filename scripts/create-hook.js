/* eslint-disable @typescript-eslint/no-var-requires, strict */
'use strict';
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { toKebabCase } = require('strman');
const hookTemplate = require('./templates/hook-template');
const testTemplate = require('./templates/test-template');
const docsTemplate = require('./templates/docs-template');
const exampleTemplate = require('./templates/example-template');

const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

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
    const [, , n] = process.argv;
    const name = toKebabCase(n);

    const srcRoot = path.join(__dirname, '../src');
    const docsRoot = path.join(srcRoot, 'docs', name);

    const file = {
      hook: path.join(srcRoot, `${name}.ts`),
      test: path.join(srcRoot, '__tests__', `${name}.tsx`),
      docs: path.join(docsRoot, `${name}.mdx`),
      example: path.join(docsRoot, `${name}.tsx`),
    };

    const hookExists = await exists(file.hook);
    if (hookExists) throw new Error(`hook ${name} already exists`);

    await mkdir(docsRoot);
    await Promise.all([
      updateIndex({ name }),
      createFile({ path: file.hook, content: hookTemplate({ name }) }),
      createFile({ path: file.test, content: testTemplate({ name }) }),
      createFile({ path: file.docs, content: docsTemplate({ name }) }),
      createFile({ path: file.example, content: exampleTemplate({ name }) }),
    ]);

    console.log(`👍 Created new hook ${name}`);
  } catch (error) {
    console.error('👎 Failed to create new hook');
    console.error(error.message);
  }
}

main();
