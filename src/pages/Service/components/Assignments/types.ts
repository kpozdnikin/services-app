import {
  AssignmentWithNamePhotosMinutesShop,
  UseServiceAssignmentActionResult,
} from '@app/interfaces';

export interface AssignmentTableCell extends UseServiceAssignmentActionResult {
  assignment: AssignmentWithNamePhotosMinutesShop;
}

export interface AssignmentResizableTableItem
  extends AssignmentWithNamePhotosMinutesShop {
  id: string;
  children: AssignmentResizableTableItem[];
}
