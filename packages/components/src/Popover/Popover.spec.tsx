import { mount } from '@cypress/react';
import { useToggle } from '@fransvilhelm/hooks';
import { useRef } from 'react';

import {
  Popover,
  Position,
  positionRight,
  positionMatchWidth,
} from './Popover';

const TestComponent: React.FC<{ position?: Position }> = ({ position }) => {
  let [show, toggle] = useToggle(false);
  let ref = useRef<HTMLButtonElement>(null);

  return (
    <button ref={ref} onClick={toggle} style={{ padding: '0.35rem 2rem' }}>
      Click me
      <Popover targetRef={ref} hidden={!show} position={position}>
        Hello world
      </Popover>
    </button>
  );
};

describe('Popover', () => {
  it('renders as expected', () => {
    mount(<TestComponent />);

    cy.findByRole('button').click();
    cy.findByText('Hello world').should('be.visible');
  });

  it('alignes to the left side by default', () => {
    mount(<TestComponent />);
    cy.findByRole('button').click();

    cy.compareRects(
      () => cy.findByRole('button'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('alignes to the right side if given positionRight', () => {
    mount(<TestComponent position={positionRight} />);
    cy.findByRole('button').click();

    cy.compareRects(
      () => cy.findByRole('button'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.right).to.equal(parent.right);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('is stretches full width if given positionMatchWidth', () => {
    mount(<TestComponent position={positionMatchWidth} />);
    cy.findByRole('button').click();

    cy.compareRects(
      () => cy.findByRole('button'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.right).to.equal(parent.right);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('adapts to the edges of the screen', () => {
    mount(
      <div style={{ paddingTop: 'calc(100vh - 30px)', paddingBottom: '100vh' }}>
        <TestComponent />
      </div>,
    );

    cy.findByRole('button').click();
    cy.findByRole('button').parent().scrollIntoView();

    cy.requestAnimationFrame();
    cy.compareRects(
      () => cy.findByRole('button'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.bottom).to.equal(parent.top);
      },
    );

    cy.findByRole('button').scrollIntoView();

    cy.requestAnimationFrame();
    cy.compareRects(
      () => cy.findByRole('button'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });
});
