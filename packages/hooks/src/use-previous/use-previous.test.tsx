import { fireEvent, render, screen } from '@testing-library/react';

import { useInput } from '../use-input';
import { usePrevious } from './use-previous';

const TestComponent: React.FC = () => {
  const input = useInput('hello');
  const previous = usePrevious(input.value);
  return (
    <div>
      <input {...input} />
      <p>Previous: {previous}</p>
    </div>
  );
};

it('should return previous value', () => {
  render(<TestComponent />);

  let input = screen.getByRole('textbox');
  let output = screen.getByText(/previous:/i);

  expect(output).toHaveTextContent('Previous:');

  fireEvent.change(input, { target: { value: 'hello world' } });
  expect(output).toHaveTextContent('Previous: hello');

  fireEvent.change(input, { target: { value: 'hello world!' } });
  expect(output).toHaveTextContent('Previous: hello world');
});
