#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');

const glob = require('glob');
const rimraf = require('rimraf');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

yargs(hideBin(process.argv))
  .command('coverage', 'report combined coverage', {}, coverage)
  .parse();

function coverage() {
  rimraf.sync('./coverage');
  rimraf.sync('./.nyc_output');

  let files = glob.sync('./**/coverage-final.json', {
    ignore: ['node_modules', './coverage/coverage-final.json'],
  });

  let temp = './.nyc_output';
  fs.mkdirSync(temp, { recursive: true });

  let i = 0;
  for (let file of files) {
    let dest = `${temp}/coverage-${i}.json`;
    fs.copyFileSync(file, dest);
    i += 1;
  }

  try {
    cp.execSync('./node_modules/.bin/nyc report', {
      stdio: 'inherit',
    });
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}
