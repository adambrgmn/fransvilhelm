/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase, toKebabCase, toStudlyCaps } = require('strman');

module.exports = ({ name }) => {
  const camel = toCamelCase(name);
  const kebab = toKebabCase(name);
  const studly = toStudlyCaps(name);
  return `---
name: ${camel}
menu: Hooks
route: /hook/${kebab}
---

import { Playground } from 'docz';
import { ${studly}Example } from './${kebab}.tsx';

# ${camel}

Will...

## Usage

\`\`\`jsx
import React from 'react';
import { ${camel} } from '@adambrgmn/hooks';

const Checkbox = () => {
  const result = ${camel}();
  return <p />;
};
\`\`\`

# Example

<Playground>
  <${studly}Example />
</Playground>

## Parameters

\`${camel}\` accepts one argument

| Param | Type | Required | Default | Description |
| :---- | :--- | :------- | :------ | :---------- |
| param | type | boolean  | boolean | description |

## Returns

\`${camel}\` returns...

| Prop | Type | Description |
| :--- | :--- | :---------- |
| prop | type | description |
`;
};
