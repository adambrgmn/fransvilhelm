import { composeStories } from '@storybook/testing-react';

import { mount } from '../test-utils';
import * as stories from './Menu.stories';

const Story = composeStories(stories);

describe('Menu', () => {
  it('renders as expected', () => {
    mount(<Story.Default />);

    cy.findByRole('menu', { hidden: true }).should('not.be.visible');
    cy.findByRole('button').should('have.attr', 'aria-expanded', 'false');
    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');
    cy.findByRole('button').should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button').click();
    cy.findByRole('menu', { hidden: true }).should('not.be.visible');
  });

  it('is possible to iterate over items with tab', () => {
    mount(<Story.Default />);

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.focused().should('have.attr', 'data-index', '0');
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-index', '1');
    cy.focused().tab({ shift: true });
    cy.focused().should('have.attr', 'data-index', '0');
  });

  it('is possible to select iterate over items with arrow keys', () => {
    mount(<Story.Default />);

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.focused().type('{downarrow}');
    cy.focused().should('have.attr', 'data-index', '1');

    cy.focused().type('{downarrow}');
    cy.focused().should('have.attr', 'data-index', '2');

    cy.focused().type('{downarrow}');
    cy.focused().should('have.attr', 'data-index', '3');

    cy.focused().type('{downarrow}');
    cy.focused().should('have.attr', 'data-index', '0');

    cy.focused().type('{uparrow}');
    cy.focused().should('have.attr', 'data-index', '3');
  });

  it('closes menu when pressing escape', () => {
    mount(<Story.Default />);

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.focused().type('{esc}');
    cy.findByRole('menu', { hidden: true }).should('not.be.visible');
  });

  it('closes menu when pressing escape', () => {
    mount(<Story.Default />);

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.focused().type('{esc}');
    cy.findByRole('menu', { hidden: true }).should('not.be.visible');
  });

  it('closes menu when clicking outside element', () => {
    mount(
      <div>
        <div>Hello</div>
        <Story.Default />
      </div>,
    );

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.findByText('Hello').click();
    cy.findByRole('menu', { hidden: true }).should('not.be.visible');
  });

  it('returns focus to menu button when closing', () => {
    mount(
      <div>
        <div>Hello</div>
        <Story.Default />
      </div>,
    );

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');

    cy.findByText('Hello').click();
    cy.findByRole('menu', { hidden: true }).should('not.be.visible');

    cy.findByRole('button').should('be.focused');
  });

  it('closes menu when clicking an item', () => {
    mount(<Story.WithOnClick />);

    cy.findByRole('button').click();
    cy.findByRole('menu').within(() => {
      cy.findByRole('menuitem', { name: 'Item A' }).click();
    });

    cy.findByText('Value: Item A').should('exist');
  });

  it('skips disabled items when traversing', () => {
    mount(<Story.WithDisabledItems />);

    cy.findByRole('button').click();
    cy.findByRole('menu').should('be.visible');
    cy.focused().should('have.attr', 'data-index', '0');

    cy.focused().type('{downarrow}');
    cy.focused().should('have.attr', 'data-index', '2');
  });
});
