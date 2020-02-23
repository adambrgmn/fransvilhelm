/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase, toStudlyCaps } = require('strman');

module.exports = ({ name }) => {
  const camel = toCamelCase(name);
  const studly = toStudlyCaps(name);

  return `import * as React from 'react';
import { ${camel} } from './';

const ${studly}Example: React.FC = () => {
  const result = ${camel}();
  return <p />;
};

export { ${studly}Example };
`;
};
