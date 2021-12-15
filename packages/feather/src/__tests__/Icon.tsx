import React from 'react';
import { render } from '@testing-library/react';
import { Icon, IconProvider } from '../Icon';

it('renders an icon', () => {
  render(
    <Icon>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>,
  );

  let svg = document.querySelector('svg');
  expect(svg).toHaveAttribute('aria-hidden', 'true');
  expect(svg).toHaveAttribute('focusable', 'false');
  expect(svg).toHaveStyle(
    'fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; width: 1em; height: 1em;',
  );
});

it('can be adjusted to baseline', () => {
  render(
    <Icon baseline>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>,
  );

  let svg = document.querySelector('svg');
  expect(svg).toHaveStyle('position: absolute; bottom: -0.150em;');
});

it('can be configured via context', () => {
  render(
    <IconProvider
      value={{
        'aria-hidden': false,
        style: { strokeWidth: 10 },
      }}
    >
      <Icon>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </Icon>
    </IconProvider>,
  );

  let svg = document.querySelector('svg');
  expect(svg).toHaveAttribute('aria-hidden', 'false');
  expect(svg).toHaveStyle('stroke-width: 10;');
});
