import { AssignmentWithNamePhotosMinutesShop } from '@app/interfaces';

import { AssignmentResizableTableItem } from './types';

export const mapAssignmentDataToResizableTable = (
  data: AssignmentWithNamePhotosMinutesShop[],
): AssignmentResizableTableItem[] =>
  data.map((item: AssignmentWithNamePhotosMinutesShop) => ({
    ...item,
    id: item.assignmentId,
    children: mapAssignmentDataToResizableTable(item.assignments),
  }));
