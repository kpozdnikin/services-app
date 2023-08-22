import { BarberPhoto, Tax } from '@app/interfaces';
import { NonAdminUserType, Nullable } from '@app/types';

export interface AssignmentTableItem {
  assignmentId: Nullable<string>;
  assigneeId: Nullable<string>;
  assignmentType: NonAdminUserType;
  enabled: Nullable<boolean>;
  requiresPrepaid: Nullable<boolean>;
  kioskEnabled: Nullable<boolean>;
  visibility: Nullable<boolean>;
}

export interface AssignmentBase extends AssignmentTableItem {
  cost: Nullable<number>;
  duration: Nullable<number>;
}

export interface Assignment extends AssignmentBase {
  assignments: Assignment[];
  brandId: string;
  order: number;
  parentId: Nullable<string>;
  serviceId: Nullable<string>;
  taxes: Tax[];
}

export interface AssignmentWithNamePhotosMinutesShop extends Assignment {
  assignmentId: string;
  assignments: AssignmentWithNamePhotosMinutesShop[];
  itemName?: string;
  minuteOptions?: number[];
  photos?: BarberPhoto[];
  shopId?: string;
}

export interface LoadingAssignments {
  [assignmentId: string]: boolean;
}
