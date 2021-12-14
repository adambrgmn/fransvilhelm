import { act, render, screen } from '@testing-library/react';

import { setupMatchMedia } from '../test-utils/setup-match-media';
import * as utils from '../utils';
import { useMediaQuery } from './use-media-query';

jest.mock('../utils.ts', () => ({ canUseDOM: jest.fn(() => true) }));
let canUseDOM = utils.canUseDOM as unknown as jest.Mock<boolean, []>;

let { emit, prepare, teardown } = setupMatchMedia(true);

beforeEach(prepare);
afterEach(teardown);

const TestComponent: React.FC<{ query: string }> = ({ query }) => {
  const matches = useMediaQuery(query);
  return <p>{matches ? 'true' : 'false'}</p>;
};

it('should test if a media query is satisfied', () => {
  render(<TestComponent query="(max-width: 400px)" />);
  expect(screen.getByText(/true/)).toBeInTheDocument();

  act(() => emit(false));
  expect(screen.getByText(/false/)).toBeInTheDocument();
});

it('works on the server', () => {
  canUseDOM.mockReturnValue(false);
  render(<TestComponent query="(max-width: 400px)" />);
  expect(screen.getByText(/false/)).toBeInTheDocument();
});
