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
