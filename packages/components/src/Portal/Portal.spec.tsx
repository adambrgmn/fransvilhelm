import { mount } from '@cypress/react';

import { Portal } from './Portal';

it('renders a portal', () => {
  const TestComponent: React.FC = () => {
    return (
      <div data-testid="parent">
        <Portal>
          <h1>Heading</h1>
        </Portal>
      </div>
    );
  };

  mount(<TestComponent />);

  cy.findByTestId('parent').then(($parent) => {
    let parent = $parent[0];
    cy.findByRole('heading').then(($heading) => {
      let heading = $heading[0];
      expect(parent.contains(heading)).to.equal(false);
    });
  });
});
