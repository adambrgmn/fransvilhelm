# Feather Icons as React components

> [Feather icons](https://feathericons.com/) as opinionated React components.

- [Installation](#installation)
- [Usage](#usage)
  - [Setting the color](#setting-the-color)
  - [Text alignment](#text-alignment)
- [License](#license)

## Installation

Use your package manager of choice:

```sh
# npm
npm i @fransvilhelm/feather
# yarn
yarn add @fransvilhelm/feather
```

The package will now be available to import and use in any of you react components.

## Usage

All icons are created individually, unrelated to each other. And all icons found on [Feather](https://feathericons.com/)
are exported as named exports. They names are transformed to pascal case: `align-center -> AlignCenter`.

```jsx
import { Trash } from '@fransvilhelm/feather';

export const RemoveButton = () => {
  return (
    <button>
      <Trash baseline /> Remove item
    </button>
  );
};
```

Since all icons are named exports and unrelated to eachother the library is easily tree-shaken. This means that if your
bundler supports tree-shaking only the icons you actually use will be included in your final bundle.

### Setting the color

The icons uses `currentColor` as the color of the strokes. That means the color will be inherited from the wrapping
element:

```jsx
<div style={{ color: 'rebeccapurple' }}>
  <ChevronRight />
</div>
```

### Text alignment

The icons only accept one prop; `baseline`. When set it will align the icon to the baseline of your text. This makes it
very easy to add the icons as inline in text, easily replacing old font icons. If you are aligning with flex and
`align-items: center` you should not set `baseline` on the icons.

## License

[MIT](https://oss.ninja/mit/adambrgmn)
