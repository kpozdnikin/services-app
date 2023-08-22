import { MouseEvent } from 'react';
import classNames from 'classnames';

import { ResizableTableTd } from './ResizableTableTd';
import { ResizableTableDataRow } from './types';

interface ResizableTableRowProps<R> {
  className: (row: R) => string;
  columnsWidth: number[];
  index: number;
  onRowClick?: (row: R) => void;
  row: R;
  table: ResizableTableDataRow<R>[];
}

export function ResizableTableRow<R extends { id: string }>(
  props: ResizableTableRowProps<R>,
) {
  const { className, columnsWidth, index, onRowClick, row, table } = props;

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.className.includes('rt-td js-expand-shop')) {
      onRowClick?.(row);
    }
  };

  return (
    <div
      className={classNames('rt-tr-group', className(row))}
      key={row.id}
      role="rowgroup"
      onClick={onClick}
    >
      <div
        className={classNames('rt-tr', {
          '-even': index % 2 === 0,
          '-odd': index % 2 !== 0,
        })}
        role="row"
      >
        {table.map((column, columnIndex) => (
          <ResizableTableTd key={column.id} width={columnsWidth[columnIndex]}>
            {column.cell(row)}
          </ResizableTableTd>
        ))}
      </div>
    </div>
  );
}
