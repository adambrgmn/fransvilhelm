# @fransvilhelm/hooks

A set of reusable hooks to use inside react components.  
[Documentation and examples](https://hooks.fransvilhelm.com/)

## Installation

The package can be installed using [npm](https://www.npmjs.com) or
[yarn](https://yarnpkg.com) or any other node package manager.

```shell
npm install @fransvilhelm/hooks
# or with yarn
yarn add @fransvilhelm/hooks
```

**NOTE:** This packages uses
[React Hooks](https://reactjs.org/docs/hooks-intro.html) and those where
releases in `react@16.8.0`. Therefore you must use a version of react that's
greater than that.

## Usage

This package contains a set of named exports and no default export is provided.

```jsx
// Use named imports to import a separate hook:
import { useInput, useCheckbox } from '@fransvilhelm/hooks';
// Or import everything:
import * as hooks from '@fransvilhelm/hooks';
```

_This package is distributed as an ESM package and if you use a modern
javascript bundler (eg. Webpack, Rollup or Parcel) the source code will be
tree-shaked and only the hooks you use will be included in your final bundle._

## Typescript

This package was originally written in Typescript and types are included by
default.

## Contribute

Contributions are more than welcome! But I also urge you to create your own
versions. These hooks are hooks that I've found that I use a lot and therefore I
started to collect them inside a repo so that I can easily use them in my
projects. You should do the same!

## License

MIT
