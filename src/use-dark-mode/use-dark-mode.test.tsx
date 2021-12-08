import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDarkMode } from './use-dark-mode';

const mockMediaQuery = jest.fn<boolean, [string]>(() => false);
jest.mock('../use-media-query', () => ({
  useMediaQuery: (query: string) => mockMediaQuery(query), // jest.fn(() => false),
}));

beforeEach(() => {
  mockMediaQuery.mockReset();
  window.localStorage.clear();
});

const TestComponent: React.FC<{ className?: string }> = ({ className }) => {
  const [enabled, setEnabled] = useDarkMode(className);
  return (
    <div>
      <p>{enabled ? 'enabled' : 'disabled'}</p>
      <button onClick={() => setEnabled(!enabled)}>Toggle</button>
      <button onClick={() => setEnabled(null)}>Clear setting</button>
    </div>
  );
};

it('should be disabled when not preferring dark mode (and no setting stored)', () => {
  mockMediaQuery.mockReturnValue(false);
  render(<TestComponent />);

  expect(screen.getByText('disabled')).toBeInTheDocument();
});

it('should be enabled when preferring dark mode (and no setting stored)', () => {
  mockMediaQuery.mockReturnValue(true);
  render(<TestComponent />);

  expect(screen.getByText('enabled')).toBeInTheDocument();
});

it('should let user local storage override query preference (disabled)', () => {
  mockMediaQuery.mockReturnValue(false);
  window.localStorage.setItem('dark-mode', 'true');

  render(<TestComponent />);

  expect(screen.getByText('enabled')).toBeInTheDocument();
});

it('should let user local storage override query preference (enabled)', () => {
  mockMediaQuery.mockReturnValue(true);
  window.localStorage.setItem('dark-mode', 'false');

  render(<TestComponent />);

  expect(screen.getByText('disabled')).toBeInTheDocument();
});

it('should be possible to toggle', () => {
  mockMediaQuery.mockReturnValue(false);
  render(<TestComponent />);

  userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByText('enabled')).toBeInTheDocument();
  expect(window.localStorage.getItem('dark-mode')).toEqual('true');
});

it('should toggle the body class name dark-mode', () => {
  mockMediaQuery.mockReturnValue(false);
  render(<TestComponent className="dark-mode" />);

  let toggle = screen.getByRole('button', { name: 'Toggle' });

  expect(window.document.body).not.toHaveClass('dark-mode');

  userEvent.click(toggle);
  expect(window.document.body).toHaveClass('dark-mode');

  userEvent.click(toggle);
  expect(window.document.body).not.toHaveClass('dark-mode');
});

it('should be possible to clear user settings', () => {
  mockMediaQuery.mockReturnValue(true);
  render(<TestComponent />);

  userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByText('disabled')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Clear setting' }));
  expect(screen.getByText('enabled')).toBeInTheDocument();
});
