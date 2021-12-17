describe('Component: Popover', () => {
  it('shows a popover', () => {
    cy.visitStory('popover', 'default');

    cy.findByRole('button').click();
    cy.findByText('Hello world').should('be.visible');
  });

  it('alignes to the left side by default', () => {
    cy.visitStory('popover', 'default');
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
    cy.visitStory('popover', 'position-right');
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
    cy.visitStory('popover', 'position-match-width');
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
    cy.visitStory('popover', 'collision-detection');

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
