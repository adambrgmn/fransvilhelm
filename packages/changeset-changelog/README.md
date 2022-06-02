# @fransvilhelm/changeset-changelog

This is a package very similar to
[`@changeset/changelog-github`](https://github.com/atlassian/changesets/tree/master/packages/changelog-github) but with
tweaks on how each release line is formatted. The goal is to make the changelog inputs look more like they do on the
[react repository](https://github.com/facebook/react/blob/master/CHANGELOG.md).

While `@changeset/changelog-github` would format a changelog entry something like this:

```
- [commitsha] #1 Thanks @adambrgmn! - [summary]
```

… this package puts the commit/pr and user behind the summary:

```
- [summary] (by @adambrgmn in #1)
```

See [this projects changelog](CHANGELOG.md) for more detailed examples.

## Installation

```sh
npm install --save-dev @fransvilhelm/changeset-changelog
# or with yarn
yarn add --dev @fransvilhelm/changeset-changelog
```

## Setup

The configuration is done in your projects [`.changeset/config.json`](.changeset/config.json):

```js
{
  "changelog": [
    "@fransvilhelm/changeset-changelog",
    { "repo": "user/repo" }
  ],
  // ... rest of config
}
```

Also note that for this changelog generator to work properly you need to set the environment variable `GITHUB_TOKEN`.
This can easily be done with [changesets's official GitHub action](https://github.com/changesets/action):

```yml
- name: Create Release Pull Request or Publish to npm
  id: changesets
  uses: changesets/action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

If you use this together with some other CI service make sure to set the token according to that vendors recommended
methods.

## License

[MIT](LICENSE)
