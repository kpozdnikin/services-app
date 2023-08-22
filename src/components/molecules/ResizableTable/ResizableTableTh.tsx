import { FC, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface ResizableTableProps {
  children: ReactNode;
  className?: string;
  id: string;
  onColumnResize: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  width: number;
}

export const ResizableTableTh: FC<ResizableTableProps> = (props) => {
  const { children, className, id, onColumnResize, width } = props;

  const onResizeStart = (e: MouseEvent<HTMLDivElement>) => {
    onColumnResize(e, id);
  };

  return (
    <Wrapper
      className={classNames('rt-th rt-resizable-header', className)}
      role="columnheader"
      width={width}
    >
      <div className="rt-resizable-header-content">{children}</div>
      <div className="rt-resizer" onMouseDown={onResizeStart} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width: number }>`
  &.rt-resizable-header {
    flex: ${(props) => props.width} 0 auto;
    width: ${(props) => props.width}px;
    max-width: ${(props) => props.width}px;
  }

  .rt-resizable-header-content {
    align-items: center;
    display: flex;
    height: 42px;
  }

  .tr-resizer {
    display: inline-block;
    position: absolute;
    width: 36px;
    top: 0;
    bottom: 0;
    right: -18px;
    cursor: col-resize;
    z-index: 10;
  }
`;
