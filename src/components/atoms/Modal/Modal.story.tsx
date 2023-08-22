import React from 'react';
import { Button } from '@getsquire/glue-ui';
import { Meta, Story } from '@storybook/react';

import { useToggle } from '../../../hooks';
import { Modal } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    onClose: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Kitten: Story<any> = (args) => {
  const [isModalOpen, , setModalOpen] = useToggle(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Open modal</Button>

      <Modal isOpen={isModalOpen} {...args} onClose={() => setModalOpen(false)}>
        Some content
      </Modal>

      <div id="containerID" />
    </>
  );
};

export const ModalStory = Kitten.bind({});
