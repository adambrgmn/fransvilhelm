/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase, toKebabCase, toStudlyCaps } = require('strman');

module.exports = ({ name }) => {
  const camel = toCamelCase(name);
  const kebab = toKebabCase(name);
  const studly = toStudlyCaps(name);

  return `import * as React from 'react';
import { ${camel} } from '../../${kebab}';

const ${studly}Example = (): JSX.Element => {
  const result = ${camel}();
  return <p />;
};

export { ${studly}Example };
`;
};
