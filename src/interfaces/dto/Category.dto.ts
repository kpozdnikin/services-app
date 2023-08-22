import { UserType } from '@app/types';

export interface CategoryDTO {
  createdAt: string;
  id: string;
  name: string;
  ownerId: string;
  ownerType: UserType;
  updatedAt: string;
}

export interface CategoriesDTO {
  count: number;
  rows: CategoryDTO[];
}
