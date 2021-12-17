import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';
import './commands';

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
