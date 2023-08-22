import { ReactNode } from 'react';
import { LifecycleFade } from '@getsquire/glue-ui';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { ShadowDomInstance } from '@app/components';
import { Cross } from '@app/assets/icons';

import { ClassicModalContents, CloseButton, Overlay } from './styled';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;

  id?: string;
  closable?: boolean;
}

const getMountingNode = (): Node | undefined => {
  const ref = ShadowDomInstance.getInstance().getRootNodeRef();
  return ref?.current?.getRootNode();
};

export const Modal = (props: Props) => {
  const { isOpen, closable = true, children, onClose } = props;

  const parentNode = (getMountingNode() as Document) ?? document;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <LifecycleFade key="overlay">
          <Overlay />
        </LifecycleFade>
      )}

      {isOpen && (
        <LifecycleFade key="contents">
          <ClassicModalContents id={props.id}>
            {closable && (
              <CloseButton onClick={onClose}>
                <Cross />
              </CloseButton>
            )}
            <div>{children}</div>
          </ClassicModalContents>
        </LifecycleFade>
      )}
    </AnimatePresence>,
    parentNode.getElementById('containerID') ?? document.body,
  );
};
