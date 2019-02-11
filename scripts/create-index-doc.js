/* eslint-disable @typescript-eslint/no-var-requires, strict */
'use strict';
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const del = require('del');
const pkg = require('../package.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const frontMatter = `---
name: '${pkg.name}'
route: /
---`;

async function main() {
  try {
    const readme = path.join(__dirname, '../README.md');
    const indexMdx = path.join(__dirname, '../src/index.mdx');

    await del([indexMdx]);

    const originalContent = await readFile(readme, 'utf-8');
    const newContent = `${frontMatter}\n\n${originalContent}`;
    await writeFile(indexMdx, newContent);
  } catch (error) {
    console.error(error);
  }
}

main();
