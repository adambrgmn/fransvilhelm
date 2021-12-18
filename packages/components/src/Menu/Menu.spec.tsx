import { composeStories } from '@storybook/testing-react';

import { mount } from '../test-utils';
import * as stories from './Menu.stories';

const Story = composeStories(stories);

describe('Menu', () => {
  it('renders as expected', () => {
    mount(<Story.Default />);
  });
});
