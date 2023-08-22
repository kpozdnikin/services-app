import { ReactNode, VFC } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface ResizableTableTdProps {
  children: ReactNode;
  className?: string;
  width: number;
}

export const ResizableTableTd: VFC<ResizableTableTdProps> = (props) => (
  <Wrapper
    className={classNames('rt-td js-expand-shop', props.className)}
    role="gridcell"
    width={props.width}
  >
    {props.children}
  </Wrapper>
);

const Wrapper = styled.div<{ width: number }>`
  &.rt-td {
    flex: ${(props) => props.width} 0 auto;
    width: ${(props) => props.width}px;
    max-width: ${(props) => props.width}px;
  }

  .u-new-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
