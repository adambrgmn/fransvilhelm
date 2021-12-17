// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitStory', (story, variant) => {
  let base = Cypress.config('baseUrl') ?? '';
  let url = new URL('/iframe.html', base);
  url.searchParams.set('id', `${story}--${variant}`);
  url.searchParams.set('viewMode', `story`);

  return cy.visit(url.toString());
});

Cypress.Commands.add('compareRects', (target1, target2, compare) => {
  target1().then((target1El) => {
    let target1Rect = target1El[0].getBoundingClientRect();
    target2().then((target2El) => {
      let target2Rect = target2El[0].getBoundingClientRect();
      compare(target1Rect, target2Rect);
    });
  });
});

Cypress.Commands.add('requestAnimationFrame', () => {
  return cy.wrap(
    new Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    }),
  );
});
