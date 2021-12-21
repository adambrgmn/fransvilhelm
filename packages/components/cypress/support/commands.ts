export {};

Cypress.Commands.add('visitStory', visitStory);
function visitStory(
  story: string,
  variant: string,
): Cypress.Chainable<Cypress.AUTWindow> {
  let base = Cypress.config('baseUrl') ?? '';
  let url = new URL('/iframe.html', base);
  url.searchParams.set('id', `${story}--${variant}`);
  url.searchParams.set('viewMode', `story`);

  return cy.visit(url.toString());
}

Cypress.Commands.add('compareRects', compareRects);
function compareRects(
  target1: () => Cypress.Chainable<JQuery<HTMLElement>>,
  target2: () => Cypress.Chainable<JQuery<HTMLElement>>,
  compare: (rect1: DOMRect, rect2: DOMRect) => void,
) {
  target1().then((target1El) => {
    let target1Rect = target1El[0]?.getBoundingClientRect();
    target2().then((target2El) => {
      let target2Rect = target2El[0]?.getBoundingClientRect();
      if (target1Rect != null && target2Rect != null) {
        compare(target1Rect, target2Rect);
      } else {
        throw new Error('Could not retrieve dom rect objects from targets.');
      }
    });
  });
}

Cypress.Commands.add('requestAnimationFrame', requestAnimationFrame);
function requestAnimationFrame() {
  return cy.wrap(
    new Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    }),
  );
}

declare global {
  namespace Cypress {
    interface Chainable {
      visitStory: typeof visitStory;
      compareRects: typeof compareRects;
      requestAnimationFrame: typeof requestAnimationFrame;
    }
  }
}
