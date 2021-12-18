import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from './Menu';

type MenuType = typeof Menu;

export default {
  title: 'Menu',
  component: Menu,
} as ComponentMeta<MenuType>;

const Template: ComponentStory<MenuType> = (args) => {
  return <Menu {...args}>Hello world</Menu>;
};

export const Default = Template.bind({});
Default.args = {};
