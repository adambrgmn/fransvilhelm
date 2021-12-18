import { useToggle } from '@fransvilhelm/hooks';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRef } from 'react';

import { Popover, positionRight, positionMatchWidth } from './Popover';

type PopoverType = typeof Popover;

export default {
  title: 'Popover',
  component: Popover,
} as ComponentMeta<PopoverType>;

const Template: ComponentStory<PopoverType> = (args) => {
  let [show, toggle] = useToggle(false);
  let ref = useRef<HTMLButtonElement>(null);

  return (
    <button ref={ref} onClick={toggle} className="border px-8 py-4">
      Click me
      <Popover
        {...args}
        targetRef={ref}
        hidden={!show}
        className="border p-4 text-center"
      >
        Hello world
      </Popover>
    </button>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const PositionRight = Template.bind({});
PositionRight.args = {
  position: positionRight,
};

export const PositionMatchWidth = Template.bind({});
PositionMatchWidth.args = {
  position: positionMatchWidth,
};

export const CollisionDetection: ComponentStory<PopoverType> = (args) => {
  return (
    <div style={{ paddingTop: 'calc(100vh - 100px)', paddingBottom: '100vh' }}>
      <Template {...args} />
    </div>
  );
};
