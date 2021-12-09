import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';

import { useTextareaResize } from './use-textarea-resize';

const TestComponent: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useTextareaResize(ref);
  return (
    <textarea
      data-testid="textarea"
      ref={ref}
      style={{ boxSizing: 'border-box' }}
    />
  );
};

it('should resize the textarea while typing', () => {
  render(<TestComponent />);
  let textarea = screen.getByTestId('textarea');
  userEvent.type(textarea, 'Hello world{enter}');
  expect(textarea).toHaveStyle({ height: '6px' });
});
