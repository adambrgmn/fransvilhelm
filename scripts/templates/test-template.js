/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase, toKebabCase } = require('strman');

module.exports = ({ name }) => `import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ${toCamelCase(name)} } from '../${toKebabCase(name)}';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const result = ${toCamelCase(name)}();
  return <p />;
};

it('should ...', () => {
  const {} = render(<TestComponent />);
});
`;
