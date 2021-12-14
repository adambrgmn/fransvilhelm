import * as github from '@changesets/get-github-info';
import { NewChangesetWithCommit } from '@changesets/types';

import changelogFunction from '../';

jest.mock('@changesets/get-github-info', () => ({ getInfo: jest.fn() }));
jest.mock('@changesets/changelog-github', () => ({
  getReleaseLine: jest.fn(async () => 'changelog-github'),
}));

const options = { repo: 'adambrgmn/changeset-changelog' };
const defaultGitHubInfo = {
  user: '@adambrgmn',
  pull: null,
  links: {
    commit: 'abc123',
    user: '@adambrgmn',
    pull: null,
  },
};

const getInfo: jest.MockedFunction<typeof github.getInfo> =
  github.getInfo as unknown as any;

it('handles single line summaries', async () => {
  const changeset: NewChangesetWithCommit = {
    id: 'abc123',
    commit: 'abc123',
    summary: 'Change summary',
    releases: [],
  };

  getInfo.mockResolvedValue({
    ...defaultGitHubInfo,
    links: {
      pull: '#1',
      commit: 'abc123',
      user: '@adambrgmn',
    },
  });

  const result = await changelogFunction.getReleaseLine(
    changeset,
    'minor',
    options,
  );

  expect(result).toEqual('- Change summary (by @adambrgmn in #1)');
});

it('handles multi line summaries', async () => {
  const options = { repo: 'adambrgmn/changeset-changelog' };

  const changeset: NewChangesetWithCommit = {
    id: 'abc123',
    commit: 'abc123',
    summary: `First line
Rest if the lines
Comes here`,
    releases: [],
  };

  getInfo.mockResolvedValue({
    ...defaultGitHubInfo,
    links: {
      pull: '#1',
      commit: 'abc123',
      user: '@adambrgmn',
    },
  });

  const result = await changelogFunction.getReleaseLine(
    changeset,
    'minor',
    options,
  );

  expect(result).toEqual(`- First line (by @adambrgmn in #1)
  Rest if the lines
  Comes here`);
});

it('handles commits without a user and/or pull request', async () => {
  const changeset: NewChangesetWithCommit = {
    id: 'abc123',
    commit: 'abc123',
    summary: 'Change summary',
    releases: [],
  };

  getInfo.mockResolvedValue({
    ...defaultGitHubInfo,
    links: {
      commit: 'abc123',
      pull: null,
      user: null,
    },
  });

  const result = await changelogFunction.getReleaseLine(
    changeset,
    'minor',
    options,
  );

  expect(result).toEqual('- Change summary (by (unknown) in abc123)');
});

it('throws an error if no config is passed', async () => {
  const changeset: NewChangesetWithCommit = {
    id: 'abc123',
    commit: 'abc123',
    summary: 'Change summary',
    releases: [],
  };

  await expect(() =>
    changelogFunction.getReleaseLine(changeset, 'minor', {}),
  ).rejects.toThrow();
});

it('passes everything along to @changesets/changelog-github if no commit exists on changeset', async () => {
  const changeset: NewChangesetWithCommit = {
    id: 'abc123',
    summary: `First line
Rest if the lines
Comes here`,
    releases: [],
  };

  getInfo.mockResolvedValue({
    ...defaultGitHubInfo,
    links: {
      pull: '#1',
      commit: 'abc123',
      user: '@adambrgmn',
    },
  });

  const result = await changelogFunction.getReleaseLine(
    changeset,
    'minor',
    options,
  );

  expect(result).toEqual('changelog-github');
});
