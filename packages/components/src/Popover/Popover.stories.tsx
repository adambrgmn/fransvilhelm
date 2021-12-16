import { useHover } from '@fransvilhelm/hooks';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRef } from 'react';

import { Popover, positionRight, positionMatchWidth } from './Popover';

type PopoverType = typeof Popover;

export default {
  title: 'Popover',
  component: Popover,
} as ComponentMeta<PopoverType>;

const Template: ComponentStory<PopoverType> = (args) => {
  let [isHovering, props] = useHover();
  let ref = useRef<HTMLButtonElement>(null);

  return (
    <button ref={ref} {...props} className="border px-8 py-4">
      Hover me
      <Popover
        {...args}
        targetRef={ref}
        hidden={!isHovering}
        className="border p-4 text-center"
      >
        <p>Hello world</p>
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
