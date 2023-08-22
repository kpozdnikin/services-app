import React from 'react';
import { Viewport } from '@getsquire/glue-ui';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    source: {
      state: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// Wrap all examples in our Viewport component that provides CSS vars
export const decorators = [
  (Story, context) => (
    <Viewport theme={context.globals.theme} style={{ height: 'auto', display: 'block', width: 'calc(100% - 80px)', 'padding': '40px' }}>
      <Story />
    </Viewport>
  ),
];

// Add switch for dark / light modes
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};
