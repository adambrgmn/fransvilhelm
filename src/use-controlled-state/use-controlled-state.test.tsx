import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useControlledState } from './use-controlled-state';
import { SetState } from '../types';

type Props = { provided?: string; onChange?: SetState<string> };

const TestComponent: React.FC<Props> = ({ provided, onChange }) => {
  const [value, setValue] = useControlledState<string>(provided, '', onChange);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

it('should control state if none is provided', () => {
  render(<TestComponent />);
  let input = screen.getByRole('textbox');
  userEvent.type(input, 'Hello world');
  expect(input).toHaveValue('Hello world');
});

it('should pass state handling to provided state if given', () => {
  render(<TestComponent provided="Nope" />);
  let input = screen.getByRole('textbox');
  userEvent.type(input, 'Hello world');
  expect(input).toHaveValue('Nope');
});

it('should call given onChange handler', () => {
  let onChange = jest.fn();
  render(<TestComponent provided="" onChange={onChange} />);
  let input = screen.getByRole('textbox');
  userEvent.type(input, 'Hello world');
  expect(input).toHaveValue('');
  expect(onChange).toHaveBeenCalledTimes('Hello world'.length);
});

it('should log a warning if moving from uncontrolled to controlled', () => {
  jest.spyOn(console, 'warn').mockImplementation();

  let { rerender } = render(<TestComponent provided={undefined} />);
  rerender(<TestComponent provided="Value" />);

  expect(console.warn).toHaveBeenCalledWith(
    'WARN: A component changed from uncontrolled to controlled.',
  );
});

it('should log a warning if moving from controlled to uncontrolled', () => {
  jest.spyOn(console, 'warn').mockImplementation();

  let { rerender } = render(<TestComponent provided="Value" />);
  rerender(<TestComponent provided={undefined} />);

  expect(console.warn).toHaveBeenCalledWith(
    'WARN: A component changed from controlled to uncontrolled.',
  );
});
