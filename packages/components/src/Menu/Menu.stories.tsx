import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import * as Menu from './Menu';

type MenuType = typeof Menu.Menu;

export default {
  title: 'Menu',
  component: Menu.Menu,
} as ComponentMeta<MenuType>;

const Template: ComponentStory<MenuType> = (args) => {
  let onClick = () => console.log('click');
  return (
    <Menu.Menu {...args}>
      <Menu.Button className="px-4 py-2 border rounded hover:bg-gray-200">
        Open menu
      </Menu.Button>
      <Menu.List className="flex flex-col p-2 px-4 space-y-2 border rounded">
        <Menu.Item
          className="hover:bg-gray-200 focus:outline-black"
          onClick={onClick}
        >
          Item A
        </Menu.Item>
        <Menu.Item
          className="hover:bg-gray-200 focus:outline-black"
          onClick={onClick}
        >
          Item B
        </Menu.Item>
        <Menu.Item
          className="hover:bg-gray-200 focus:outline-black"
          onClick={onClick}
        >
          Item C
        </Menu.Item>
        <Menu.Item
          className="hover:bg-gray-200 focus:outline-black"
          onClick={onClick}
        >
          Item D
        </Menu.Item>
      </Menu.List>
    </Menu.Menu>
  );
};

export const Default = Template.bind({});
Default.args = {};
