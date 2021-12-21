import { render, screen } from '@testing-library/react';

import { createDescendantContext } from './useDescendants';

describe('useDescendants', () => {
  let [Provider, , useDescendants, useDescendant] = createDescendantContext<
    HTMLElement,
    {}
  >();

  let Wrapper: React.FC = ({ children }) => {
    let manager = useDescendants();
    return <Provider value={manager}>{children}</Provider>;
  };

  it('handles and registers descendants', () => {
    let TestDescendant: React.FC<{ children: string }> = ({ children }) => {
      let { register, index } = useDescendant();
      return <div ref={register}>{`${index}:${children}`}</div>;
    };

    let TestComponent: React.FC = () => {
      return (
        <div data-testid="parent">
          {['a', 'b', 'c', 'd'].map((char) => (
            <TestDescendant key={char}>{char}</TestDescendant>
          ))}
        </div>
      );
    };

    render(<TestComponent />, { wrapper: Wrapper });

    expect(screen.getByTestId('parent')).toMatchInlineSnapshot(`
      <div
        data-testid="parent"
      >
        <div
          data-index="0"
        >
          0:a
        </div>
        <div
          data-index="1"
        >
          1:b
        </div>
        <div
          data-index="2"
        >
          2:c
        </div>
        <div
          data-index="3"
        >
          3:d
        </div>
      </div>
    `);
  });
});
