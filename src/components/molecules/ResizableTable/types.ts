import { ReactNode } from 'react';

export interface ResizableTableDataRow<R> {
  header: ReactNode;
  cell: (item: R) => ReactNode;
  id: string;
  width: number;
}
