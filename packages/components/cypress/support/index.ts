/// <reference types="cypress" />
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      visitStory(story: string, variant: string): Chainable<Cypress.AUTWindow>;

      compareRects(
        target1: () => Chainable<JQuery<HTMLElement>>,
        target2: () => Chainable<JQuery<HTMLElement>>,
        compare: (rect1: DOMRect, rect2: DOMRect) => void,
      ): void;

      requestAnimationFrame(): void;
    }
  }
}
