/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase } = require('strman');

module.exports = ({ name }) => `import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ${toCamelCase(name)} } from './';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const result = ${toCamelCase(name)}();
  return <p />;
};

it('should ...', () => {
  const {} = render(<TestComponent />);
});
`;
