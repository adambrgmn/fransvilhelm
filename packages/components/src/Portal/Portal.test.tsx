import { render, screen } from '@testing-library/react';

import { Portal } from './Portal';

it('renders a portal', () => {
  const TestComponent: React.FC = () => {
    return (
      <div data-testid="parent">
        <Portal>
          <h1>Heading</h1>
        </Portal>
      </div>
    );
  };
  render(<TestComponent />);

  let parent = screen.getByTestId('parent');
  let heading = screen.getByRole('heading');

  expect(parent.contains(heading)).toBeFalsy();
});
