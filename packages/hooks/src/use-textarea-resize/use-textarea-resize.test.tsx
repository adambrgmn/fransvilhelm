import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

import { useTextareaResize } from './use-textarea-resize';

const mockCanUseDOM = jest.fn(() => true);
jest.mock('../utils.ts', () => ({
  ...jest.requireActual('../utils.ts'),
  canUseDOM: () => mockCanUseDOM(),
}));

beforeEach(() => {
  mockCanUseDOM.mockReturnValue(true);
});

const TestComponent: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaResize(ref);
  return <textarea data-testid="textarea" ref={ref} style={{ boxSizing: 'border-box' }} />;
};

it('should resize the textarea while typing', () => {
  render(<TestComponent />);
  let textarea = screen.getByTestId('textarea');
  userEvent.type(textarea, 'Hello world{enter}');
  expect(textarea).toHaveStyle({ height: '6px' });
});

it('does not break if ref is not attached immediatedly', () => {
  let spy = jest.spyOn(console, 'error');
  let Test = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    useTextareaResize(ref);
    return <textarea data-testid="textarea" style={{ boxSizing: 'border-box' }} />;
  };

  render(<Test />);
  let textarea = screen.getByTestId('textarea');
  userEvent.type(textarea, 'Hello world{enter}');
  expect(spy).not.toHaveBeenCalled();
});

it('does not break if rendered in server like environment', () => {
  mockCanUseDOM.mockReturnValue(false);
  render(<TestComponent />);
  let spy = jest.spyOn(console, 'error');
  expect(spy).not.toHaveBeenCalled();
});
