import React, { useEffect, useRef, useState } from 'react';
import { Columns, Card, CardHeader, Button } from '@getsquire/glue-ui';
import { Meta, Story } from '@storybook/react';

import { ShadowDomInstance } from '../../organisms/ShadowDom';

import { Confirm } from '.';

export default {
  title: 'Confirm',
} as Meta;

const Template: Story<any> = () => {
  const [confirmed, setConfirmed] = useState<string>('');
  const ref = useRef(null);

  useEffect(() => {
    ShadowDomInstance.getInstance().setRootNodeRef(ref);
  }, [ref]);

  const clickHandler = () => {
    Confirm('Are you sure?', 'Are you sure?').then((v) => setConfirmed(v ? 'yes' : 'no'));
  };

  const asyncClickHandler = async () => {
    const result = await Confirm('Are you sure?');
    setConfirmed(result ? 'yes' : 'no');
  };

  return (
    <>
      <div ref={ref} id="containerID">
        <Columns cols={[1]}>
          <Card>
            <CardHeader>The Confirmation Dialog</CardHeader>

            <Button variant="primary" onClick={clickHandler}>
              Click me
            </Button>

            <Button variant="secondary" onClick={asyncClickHandler}>
              Same, but async
            </Button>

            <p>Did user agree? {JSON.stringify(confirmed)}</p>

            <p>
              The idea behind Confirm is that you can use a standard, promise based piece
              of code in your interactions, but the whole rendering and component
              complexity is all abstracted inside the Confirm class.
            </p>

            <p>It is the modern day equivalent of native JS confirm.</p>

            <pre>
              {`const asyncClickHandler = async () => {
  const result = await Confirm('Are you sure?');
  setConfirmed(result ? 'yes' : 'no');
};`}
            </pre>

            <p>Admit it, its pretty convenient.</p>
          </Card>
        </Columns>
      </div>
    </>
  );
};

export const ConfirmStory = Template.bind({});
