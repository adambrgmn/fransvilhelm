import githubChangelogFunctions from '@changesets/changelog-github';
import { getInfo } from '@changesets/get-github-info';
import { ChangelogFunctions } from '@changesets/types';

const changelogFunctions: ChangelogFunctions = {
  ...githubChangelogFunctions,
  getReleaseLine: async (changeset, _, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@fransvilhelm/changeset-changelog", { "repo": "org/repo" }]',
      );
    }
    const [firstLine, ...summary] = changeset.summary
      .split('\n')
      .map((l) => l.trimRight());

    if (changeset.commit) {
      let { links } = await getInfo({
        repo: options.repo,
        commit: changeset.commit,
      });

      let { pull, commit, user } = links;
      let userInfo = `(by ${user ?? '(unknown)'} in ${pull ?? commit})`;

      let init = `- ${firstLine} ${userInfo}`;
      let rest = summary.map((l) => `  ${l}`).join('\n');
      return [init, rest].filter(Boolean).join('\n');
    } else {
      return githubChangelogFunctions.getReleaseLine(changeset, _, options);
    }
  },
};

export default changelogFunctions;
