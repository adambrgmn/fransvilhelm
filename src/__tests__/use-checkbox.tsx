import 'jest-dom/extend-expect';
import * as React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { useCheckbox } from '../use-checkbox';

afterEach(cleanup);

const TestComponent = (): JSX.Element => {
  const checkbox = useCheckbox();
  return (
    <div>
      <p data-testid="result">Checked: {checkbox.checked ? 'true' : 'false'}</p>
      <input type="checkbox" data-testid="checkbox" {...checkbox} />
    </div>
  );
};

it('should provide checked value and onChange handler for a checkbox', () => {
  const { getByTestId } = render(<TestComponent />);
  const result = getByTestId('result');
  const checkbox = getByTestId('checkbox');

  expect(result).toHaveTextContent('Checked: false');

  fireEvent.click(checkbox);
  expect(result).toHaveTextContent('Checked: true');
});
