import { ComponentProps, useState, VFC } from 'react';
import { Meta, Story } from '@storybook/react';
import { P } from '@getsquire/glue-ui';

import { LocaleProvider } from '@app/contexts';

import { ErrorBoundary } from './ErrorBoundary';

export default {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
} as Meta;

const Content: VFC = () => {
  const [error, setError] = useState(false);

  setTimeout(() => {
    setError(true);
  }, 5000);

  if (error) {
    throw new Error('Gotcha');
  }

  return <P>Some text</P>;
};

const Template: Story<ComponentProps<typeof ErrorBoundary>> = (props) => (
  <LocaleProvider>
    <ErrorBoundary {...props}>
      <Content />
    </ErrorBoundary>
  </LocaleProvider>
);

export const ErrorBoundaryStory = Template.bind({});
