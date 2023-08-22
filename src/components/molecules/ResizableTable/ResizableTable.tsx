import { useEffect, useState, MouseEvent, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { ResizableTableDataRow } from './types';
import { ResizableTableRow } from './ResizableTableRow';
import { ResizableTableTh } from './ResizableTableTh';

interface ResizableTableProps<R> {
  childRowClassName: (row: R) => string;
  className?: string;
  data?: R[];
  onParentRowClick: (row: R) => void;
  parentRowClassName: (row: R) => string;
  table: ResizableTableDataRow<R>[];
}

export function ResizableTable<R extends { id: string; children: R[] }>(
  props: ResizableTableProps<R>,
) {
  const {
    childRowClassName,
    className,
    data,
    onParentRowClick,
    parentRowClassName,
    table,
  } = props;
  const [columnsWidth, setColumnsWidth] = useState<number[]>(
    table.map((column) => column.width),
  );
  const currentDragElement = useRef<number>();
  const startWidth = useRef<number>();
  const startX = useRef<number>();

  const onResizeStart = (e: MouseEvent<HTMLDivElement>, id: string) => {
    const parent = e.currentTarget.parentNode as HTMLDivElement;
    const targetItemIndex = table.findIndex((item) => item.id === id);

    if (parent && targetItemIndex !== undefined) {
      currentDragElement.current = targetItemIndex;
      startWidth.current = parent.offsetWidth;
      startX.current = e.clientX;
    }

    initDrag();
  };

  const doDrag = (e: Event) => {
    setColumnsWidth((prevColumnsWidth: number[]) => {
      const newColumnsWidth = [...prevColumnsWidth];

      if (
        currentDragElement.current !== undefined &&
        startX.current &&
        startWidth.current
      ) {
        newColumnsWidth[currentDragElement.current] =
          startWidth.current + ((e as unknown) as MouseEvent).clientX - startX.current;
      }

      return newColumnsWidth;
    });
  };

  const stopDrag = () => {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
  };

  const initDrag = () => {
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  };

  useEffect(() => {
    return stopDrag();
  });

  return (
    <div
      className={classNames(
        'ReactTable c-table-card c-table-new c-overflow-visible c-header-overflow-visible',
        className,
      )}
    >
      <div className="rt-table" role="grid">
        <div className="rt-thead -header">
          <div className="rt-tr" role="row">
            {table.map((headerColumn, index) => (
              <ResizableTableTh
                id={headerColumn.id}
                key={headerColumn.id}
                width={columnsWidth[index]}
                onColumnResize={onResizeStart}
              >
                {headerColumn.header}
              </ResizableTableTh>
            ))}
          </div>
        </div>
        <RTBody className="rt-tbody">
          {data?.map((dataItem, i: number) => {
            return (
              <div key={dataItem.id}>
                <ResizableTableRow<R>
                  className={parentRowClassName}
                  columnsWidth={columnsWidth}
                  index={i}
                  key={dataItem.id}
                  row={dataItem}
                  table={table}
                  onRowClick={onParentRowClick}
                />
                {dataItem.children.map((child, j) => (
                  <ResizableTableRow<R>
                    className={childRowClassName}
                    columnsWidth={columnsWidth}
                    index={j}
                    key={child.id}
                    row={child}
                    table={table}
                  />
                ))}
              </div>
            );
          })}
        </RTBody>
      </div>
    </div>
  );
}

const RTBody = styled.div`
  min-width: 1178px;
`;
