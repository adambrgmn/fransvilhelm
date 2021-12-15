import * as path from 'path';
import { promises as fs } from 'fs';
import { exec } from '@actions/exec';
import * as core from '@actions/core';
import axios from 'axios';
import semver from 'semver';

const relativePath = (...paths) => path.join(process.cwd(), ...paths);
const readJson = async (filePath) => {
  return JSON.parse(await fs.readFile(relativePath(filePath), 'utf-8'));
};

(async () => {
  let currentFeather = await readJson(
    'node_modules/feather-icons/package.json',
  );

  let { data: feather } = await axios.get(
    'https://unpkg.com/feather-icons/package.json',
  );

  let diff = semver.diff(currentFeather.version, feather.version);
  switch (diff) {
    case 'premajor':
    case 'preminor':
    case 'prepatch':
    case 'prerelease':
      console.log('Patch or prerelease found. Ignoring.');
      core.setOutput('feather-bumped', 'false');
      return;
    case null:
      console.log('No version bump detected. Ignoring.');
      core.setOutput('feather-bumped', 'false');
      return;
    default:
      console.log('Feather icons bumped, initiating version bump');
  }

  await exec('yarn', ['add', 'feather-icons']);
  await exec('yarn', ['add', '--dev', '@types/feather-icons']);

  let changeset = `
---
'@fransvilhelm/feather': ${diff}
---

Bump feather-icons to version ${feather.version}.
`;

  await fs.writeFile(
    relativePath('.changeset/feather.md'),
    changeset.trim() + '\n',
  );

  core.setOutput('feather-bumped', 'true');
})();
