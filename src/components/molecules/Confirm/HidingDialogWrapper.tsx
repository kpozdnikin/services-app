import { useState, VFC } from 'react';
import { Button, ButtonGroup, Spacer, Hr } from '@getsquire/glue-ui';
import { StyleSheetManager } from 'styled-components';

import { Modal } from '@app/components';

import { Content, DangerButton, ModalTitle, Wrapper } from './styled';
import { ButtonType } from './types';

interface Props {
  containerNode: HTMLElement;
  message: string;
  close: (v: boolean) => void;
  title?: string;
  buttons?: [ButtonType] | [ButtonType, ButtonType];
}

type DialogButtonProps = Omit<ButtonType, 'type'> & { onClick: () => void };

const DialogButton: VFC<DialogButtonProps> = ({ variant, text, onClick }) =>
  variant === 'danger' ? (
    <DangerButton onClick={onClick}>{text}</DangerButton>
  ) : (
    <Button variant={variant} onClick={onClick}>
      {text}
    </Button>
  );

export const HidingDialogWrapper = (props: Props) => {
  const { containerNode, message, close } = props;
  const [isOpen, setOpen] = useState(true);

  const handleClose = (v: boolean) => () => {
    // We're toggling isOpen so that Framer Motion can work its magic when the
    // component is being unmounted. No timeouts, no ref - let the library handle this.
    setOpen(false);
    close(v);
  };

  const defaultButtons: [ButtonType, ButtonType] = [
    {
      variant: 'secondary',
      text: 'Cancel',
      type: 'cancel',
    },
    {
      variant: 'danger',
      text: 'Confirm',
      type: 'ok',
    },
  ];

  const buttons = props.buttons ?? defaultButtons;

  // Using stylesheet manager, because this is embedded inside a Shadow Dom
  // and because its in a portal AND a custom render function, styled components
  // get all confused about where to inject the new styles.
  return (
    <StyleSheetManager target={containerNode}>
      <Modal closable isOpen={isOpen} onClose={handleClose(false)}>
        <Wrapper>
          {!!props.title && (
            <>
              <ModalTitle>{props.title}</ModalTitle>
              <Hr />
            </>
          )}
          <Content>{message}</Content>

          <Spacer />

          <ButtonGroup fullwidth right>
            {buttons.map((button) => (
              <DialogButton
                key={button.text}
                {...button}
                onClick={handleClose(button.type === 'ok')}
              />
            ))}
          </ButtonGroup>
        </Wrapper>
      </Modal>
    </StyleSheetManager>
  );
};
