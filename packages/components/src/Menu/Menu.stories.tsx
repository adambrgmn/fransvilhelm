import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { Fragment, useState } from 'react';

import * as Menu from './Menu';

type MenuType = typeof Menu.Menu;

export default {
  title: 'Menu',
  component: Menu.Menu,
} as ComponentMeta<MenuType>;

let c = {
  button: 'px-4 py-2 border rounded hover:bg-gray-200',
  list: 'flex flex-col border rounded',
  item: 'hover:bg-gray-200 focus:outline-black px-4 py-2',
};

const Template: ComponentStory<MenuType> = (args) => {
  return (
    <Menu.Menu {...args}>
      <Menu.Button className={c.button}>Open menu</Menu.Button>
      <Menu.List className={c.list}>
        <Menu.Item className={c.item}>Item A</Menu.Item>
        <Menu.Item className={c.item}>Item B</Menu.Item>
        <Menu.Item className={c.item}>Item C</Menu.Item>
        <Menu.Item className={c.item}>Item D</Menu.Item>
      </Menu.List>
    </Menu.Menu>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithOnClick: ComponentStory<MenuType> = (args) => {
  let [selected, setSelected] = useState<string | null>(null);
  return (
    <Fragment>
      <p>Value: {selected}</p>
      <Menu.Menu {...args}>
        <Menu.Button className={c.button}>Open menu</Menu.Button>
        <Menu.List className={c.list}>
          <Menu.Item className={c.item} onClick={() => setSelected('Item A')}>
            Item A
          </Menu.Item>
          <Menu.Item className={c.item} onClick={() => setSelected('Item B')}>
            Item B
          </Menu.Item>
          <Menu.Item className={c.item} onClick={() => setSelected('Item C')}>
            Item C
          </Menu.Item>
          <Menu.Item className={c.item} onClick={() => setSelected('Item D')}>
            Item D
          </Menu.Item>
        </Menu.List>
      </Menu.Menu>
    </Fragment>
  );
};

export const WithDisabledItems: ComponentStory<MenuType> = (args) => {
  return (
    <Menu.Menu {...args}>
      <Menu.Button className={c.button}>Open menu</Menu.Button>
      <Menu.List className={c.list}>
        <Menu.Item className={c.item}>Item A</Menu.Item>
        <Menu.Item disabled className={c.item}>
          Item B
        </Menu.Item>
        <Menu.Item className={c.item}>Item C</Menu.Item>
        <Menu.Item className={c.item}>Item D</Menu.Item>
      </Menu.List>
    </Menu.Menu>
  );
};
