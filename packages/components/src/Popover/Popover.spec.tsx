import { composeStories } from '@storybook/testing-react';

import { mount } from '../test-utils';
import * as stories from './Popover.stories';

const Story = composeStories(stories);

describe('Popover', () => {
  it('renders as expected', () => {
    mount(<Story.Default />, { strict: true });

    cy.findByText('Click me').click();
    cy.findByText('Hello world').should('be.visible');
  });

  it('alignes to the left side by default', () => {
    mount(<Story.Default />);
    cy.findByText('Click me').click();

    cy.compareRects(
      () => cy.findByText('Click me'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('alignes to the right side if given positionRight', () => {
    mount(<Story.PositionRight />);
    cy.findByText('Click me').click();

    cy.compareRects(
      () => cy.findByText('Click me'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.right).to.equal(parent.right);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('is stretches full width if given positionMatchWidth', () => {
    mount(<Story.PositionMatchWidth />);
    cy.findByText('Click me').click();

    cy.compareRects(
      () => cy.findByText('Click me'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.right).to.equal(parent.right);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });

  it('adapts to the edges of the screen', () => {
    mount(<Story.CollisionDetection />);

    cy.findByText('Click me').click();
    cy.findByText('Click me')
      .parent()
      .scrollIntoView();

    cy.requestAnimationFrame();
    cy.compareRects(
      () => cy.findByText('Click me'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.bottom).to.equal(parent.top);
      },
    );

    cy.findByText('Click me').scrollIntoView();

    cy.requestAnimationFrame();
    cy.compareRects(
      () => cy.findByText('Click me'),
      () => cy.findByText('Hello world'),
      (parent, popover) => {
        expect(popover.left).to.equal(parent.left);
        expect(popover.top).to.equal(parent.bottom);
      },
    );
  });
});
