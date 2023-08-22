import { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Viewport } from '@getsquire/glue-ui';

import { darkTheme, lightTheme } from '@app/styles';

import { ShadowDomInstance } from './shadowDomNodeContext';

interface Props {
  children: Element | Element[] | ReactElement | ReactElement[];
}

const StyledViewport = styled(Viewport)`
  ${lightTheme};

  @media screen and (prefers-color-scheme: dark) {
    ${darkTheme};
  }
`;

export const AppContainer = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef && viewportRef.current !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ShadowDomInstance.getInstance().setRootNodeRef(viewportRef);
    }
  }, [viewportRef]);

  return (
    <div ref={ref}>
      <StyledViewport ref={viewportRef} id="containerID">
        {props.children}
      </StyledViewport>
    </div>
  );
};
