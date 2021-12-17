describe('Component: Popover', () => {
  it('shows a popover', () => {
    cy.visitStory('popover', 'default');

    cy.findByRole('button').should('exist');
  });
});
