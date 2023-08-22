import { Button, designPx, Hr } from '@getsquire/glue-ui';
import styled from 'styled-components';

import { vars } from '@app/styles';

export const DangerButton = styled(Button)`
  background-color: rgba(255, 59, 48, 0.1);
  color: var(${vars.colors.error});
  border: none;
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: ${designPx(18)};
  line-height: ${designPx(25)};
  color: var(${vars.confirm.title});
  margin-bottom: ${designPx(16)};
`;

export const Wrapper = styled.div`
  min-width: ${designPx(448)};

  & ${Hr} {
    left: 0;
    position: absolute;
    margin: 0;
  }
`;

export const Content = styled.p`
  white-space: pre-wrap;
  // Having margins collapsed makes me put 40 here instead of 24
  margin-top: ${designPx(40)};
  text-align: center;
  width: 100%;
  font-weight: 400;
  font-size: ${designPx(14)};
  line-height: ${designPx(19)};
  opacity: 0.6;
`;
