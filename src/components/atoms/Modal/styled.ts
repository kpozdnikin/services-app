import styled from 'styled-components';
import { designPx } from '@getsquire/glue-ui';

import { vars } from '@app/styles';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

export const ClassicModalContents = styled.div`
  box-sizing: border-box;
  background: var(${vars.card.bg});
  box-shadow: 0px -12px 32px rgba(0, 0, 0, 0.16);
  border-radius: 16px 16px 10px 10px;
  padding: ${designPx(16)} ${designPx(22)} ${designPx(24)};
  max-height: 80%;
  max-width: 90%;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0;
  transform: translateY(-50%) translateX(-50%);
  z-index: 1001;
  width: fit-content;
  height: fit-content;
`;

export const CloseButton = styled.div`
  position: absolute;
  color: var(${vars.confirm.title});
  opacity: 0.4;
  padding: ${designPx(11)};
  cursor: pointer;
  z-index: 99;
  right: ${designPx(11)};
  top: ${designPx(4)};
`;
