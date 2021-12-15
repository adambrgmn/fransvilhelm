import { join } from 'path';
import { promises as fs } from 'fs';
import { icons } from 'feather-icons';
import _ from 'lodash';

const pascalCase = (str) => _.upperFirst(_.camelCase(str));
const relPath = (...p) => join(process.cwd(), ...p);

const component = (contents, name) => {
  return `
export const ${name} = forwardRef<HTMLSpanElement, IconProps>(function ${name} (props: IconProps, ref) {
  return <Icon {...props} ref={ref}>${contents}</Icon>;
});`;
};

const componentBase = `
import React, { forwardRef } from 'react';
import { Icon, IconProps } from './Icon';
`;

const story = (name) => {
  return `
export const ${name}: Story<IconProps> = (props) => <Icons.${name} {...props} />;
${name}.args = { baseline: false };
`;
};

const storyBase = `
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Icon, IconProps } from '../Icon';
import * as Icons from '../Icons';

export default {
  title: 'Icon',
  component: Icon,
} as Meta;

export const All: Story<IconProps & { icon: keyof typeof Icons }> = (props) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '1rem' }}>
      {Object.entries(Icons).map(([key, Icon]) => (
        <Icon key={key} {...props} />
      ))}
    </div>
  );
};
`;

(async () => {
  try {
    let components = [];
    let stories = [];

    for (let key in icons) {
      let icon = icons[key];
      let name = pascalCase(icon.name);
      components.push(component(icon.contents, name).trim());
      stories.push(story(name).trim());
    }

    let fileContent = [componentBase.trim(), ...components].join('\n\n') + '\n';
    await fs.writeFile(relPath('./src/Icons.tsx'), fileContent);

    // We skip this until we bring back storybook in the monorepo
    // let storyContent = [storyBase.trim(), ...stories].join('\n\n') + '\n';
    // await fs.mkdir(relPath('./src/stories'), { recursive: true });
    // await fs.writeFile(
    //   relPath('./src/stories/Icons.stories.tsx'),
    //   storyContent,
    // );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
