import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';

import { AppContainer } from './AppContainer';

interface Props {
  children: Element | Element[] | ReactElement | ReactElement[];
  target: HTMLElement;
}

export const PortalApp = ({ target, children }: Props) =>
  ReactDOM.createPortal(
    <StyleSheetManager target={target}>
      <AppContainer>{children}</AppContainer>
    </StyleSheetManager>,
    target,
  );
