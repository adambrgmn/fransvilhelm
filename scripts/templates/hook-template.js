/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase } = require('strman');

module.exports = ({ name }) => `import {} from 'react';

const ${toCamelCase(name)} = () => {};

export { ${toCamelCase(name)} };
`;
