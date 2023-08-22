import { Category } from '@app/interfaces';
import { NonAdminUserType, Nullable, TaxBase } from '@app/types';

import { Assignment } from './Assignment';

export interface Addon {
  id: string;
}

export interface ServiceOrder {
  id: string;
  order: number;
}

export interface ServiceBase {
  id: string;
  cost: number;
  createdAt: Nullable<string>;
  createdBy: Nullable<NonAdminUserType>;
  createdById: Nullable<string>;
  desc: Nullable<string>;
  enabled: boolean;
  kioskEnabled: boolean;
  name: Nullable<string>;
  requiresPrepaid: boolean;
}

export interface Service extends ServiceOrder {
  addonOnly?: boolean;
  addons?: Addon[];
  assignments?: Assignment[];
  brandId: Nullable<string>;
  desc: Nullable<string>;
  enabled: boolean;
  categories: Category[];
  cost: number;
  costWithTaxes: number;
  costWithoutTaxes: number;
  createdAt: Nullable<string>; // "2022-01-24T13:14:31.935Z"
  createdBy: Nullable<NonAdminUserType>;
  createdById: Nullable<string>;
  duration: number;
  id: string;
  imported: boolean;
  kind: number;
  kioskEnabled: boolean;
  localizedDesc?: { [key: string]: string };
  localizedName?: { [key: string]: string };
  name: Nullable<string>;
  requiresPrepaid: boolean;
  serviceCategoriesId: Nullable<string>;
  taxAmount: number;
  taxes: TaxBase[];
  updatedAt: Nullable<string>; // "2022-01-24T13:14:31.935Z"
}

// FIXME: Think on better naming
export interface SingleService extends ServiceBase {
  durationHours: number;
  durationMinutes: number;
  localizedDesc?: { [key: string]: string };
  localizedName?: { [key: string]: string };
  serviceCategoriesId: Nullable<string>;
  tax: string[];
}
