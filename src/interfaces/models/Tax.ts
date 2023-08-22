import { TaxBase, Taxable } from '@app/types';

export interface Tax extends TaxBase {
  addToPrice: boolean;
  assignmentId: string;
  brandId: string;
  createdAt: string; // "2018-03-13T18:51:23.490Z"
  enabled: boolean;
  externalOrdersOnly: boolean;
  id: string;
  name: string;
  originalId: string;
  ownerId: string;
  ownerType: 'shop' | 'brand';
  parentId: string;
  percentage: number;
  taxable: Taxable[];
  updatedAt: string; // "2021-01-21T22:09:37.566Z"
}
