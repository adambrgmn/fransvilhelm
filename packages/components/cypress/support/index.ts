import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';
import './commands';
import { setGlobalConfig } from '@storybook/testing-react';

// @ts-ignore
import * as storybookPreview from '../../.storybook/preview';

setGlobalConfig(storybookPreview);

let el: HTMLScriptElement;
before(() => {
  return new Promise((resolve, reject) => {
    el = document.createElement('script');
    el.onload = resolve;
    el.onerror = reject;
    el.src = 'https://cdn.tailwindcss.com';
    document.body.appendChild(el);
  });
});

after(() => {
  if (el) {
    document.body.removeChild(el);
  }
});
