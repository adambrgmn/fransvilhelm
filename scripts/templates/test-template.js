/* eslint-disable @typescript-eslint/no-var-requires */
const { toCamelCase } = require('strman');

module.exports = ({ name }) => `import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
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
