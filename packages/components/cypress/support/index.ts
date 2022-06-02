import '@cypress/code-coverage/support';
import { setGlobalConfig } from '@storybook/testing-react';
import '@testing-library/cypress/add-commands';
import 'cypress-plugin-tab';

// @ts-ignore
import * as storybookPreview from '../../.storybook/preview';
import './commands';

setGlobalConfig(storybookPreview);

let elements = new Set<HTMLElement>();

before(() => {
  return new Promise((resolve, reject) => {
    let styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode('[hidden] { display: none; };'));
    document.body.appendChild(styleEl);
    elements.add(styleEl);

    let scriptEl = document.createElement('script');
    scriptEl.onload = resolve;
    scriptEl.onerror = reject;
    scriptEl.src = 'https://cdn.tailwindcss.com';
    document.body.appendChild(scriptEl);
    elements.add(scriptEl);
  });
});
