import type { Barber, Brand, Shop } from '@getsquire/sage/types';
import type { SessionView } from '@getsquire/sage/session/types';
import type { CurrencyCode } from '@getsquire/sage/settings';
import { UseQueryResult } from 'react-query';

import {
  AssignmentWithNamePhotosMinutesShop,
  BarberAndShopId,
  BarberWithPhotos,
  BrandAndCategoryIds,
  BrandId,
  CategoriesDTO,
  Category,
  Service,
  ServiceId,
  SingleService,
  ShopId,
  TaxesDTO,
} from '@app/interfaces';
import { WithoutId } from '@app/types';
import { Nullable, UserPermissions, UserType } from '@app/types';

export interface ApiInitialConfig {
  barber?: Barber;
  barbers?: Barber[];
  brand?: Nullable<Brand>;
  currency?: CurrencyCode;
  userKind?: UserType;
  view?: SessionView;
  shop?: Shop;
  shops?: Shop[];
}

export interface ShopsList {
  shops: Shop[];
}

export interface UseServicesListExportResult {
  exportToCsv: () => void;
  loading: boolean;
}

export interface UseServiceListMutationResult {
  handleUpdateOrder: (service: Service[]) => void;
}

export interface UseServiceCategoryMutationResult {
  handleAddCategory: (category: WithoutId<Category>) => void;
  handleDeleteCategory: (categoryId: string) => void;
  handleUpdateCategory: (category: Category) => void;
  loading: boolean;
}

export interface UseServiceAssignmentMutationResult {
  assign: (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
    barberIds: string[],
    shopId: string,
  ) => Promise<void>;
  saveAssignment: (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => void;
  deleteAssignment?: (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => void;
}

export interface UseServiceAssignmentActionResult {
  changeAssignmentField: (
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => Promise<void>;
  loadingAssignments: { [assignmentId: string]: boolean };
  toggleAssignment: (assignment: AssignmentWithNamePhotosMinutesShop) => Promise<void>;
}

export interface UseServiceMutationResultBase {
  isLoading: boolean;
}

export interface UseServiceAddResult extends UseServiceMutationResultBase {
  mutate: (service: WithoutId<SingleService>) => Promise<Service>;
}

export interface UseServiceDeleteResult extends UseServiceMutationResultBase {
  mutate: (serviceId: string) => Promise<void>;
}

export interface UseServiceUpdateResult extends UseServiceMutationResultBase {
  mutate: (service: SingleService) => Promise<void>;
}

export interface UserName {
  userName?: string;
}

export type LimitSkip = {
  limit: number;
  skip: number;
};

export type ServiceApp = ApiConfig<BrandId | ShopId | BarberAndShopId>;

export interface ApiConfig<T extends ShopId | BrandId | BarberAndShopId> {
  userKind?: UserType;
  barber?: Barber;
  brand?: Nullable<Brand>;
  currency?: CurrencyCode;
  features: UserPermissions;
  getEditPermissionsByService: (
    service?: SingleService,
  ) => {
    canEditCategory: boolean;
    canEditServiceNameOrDescription: boolean;
  };
  shop?: Shop;
  shops?: Shop[];
  view?: SessionView;
  listExport: {
    hook: (payload: T & UserName) => UseServicesListExportResult;
    buildPayload: (userName?: string) => T & UserName;
  };
  listQuery: {
    hook: (payload: T) => UseQueryResult<Service[]>;
    buildPayload: () => T;
  };
  listMutation: {
    hook: (payload: T) => UseServiceListMutationResult;
    buildPayload: () => T;
  };
  serviceQuery: {
    hook: (payload: T & ServiceId) => UseQueryResult<Service>;
    buildPayload: (serviceId: string) => T & ServiceId;
  };
  serviceAddMutation: {
    hook: (payload: T) => UseServiceAddResult;
    buildPayload: () => T;
  };
  serviceDeleteMutation: {
    hook: (payload: T) => UseServiceDeleteResult;
    buildPayload: () => T;
  };
  serviceUpdateMutation: {
    hook: (payload: T) => UseServiceUpdateResult;
    buildPayload: () => T;
  };
  categoriesListQuery: {
    hook: (payload: BrandId & LimitSkip) => UseQueryResult<CategoriesDTO>;
    buildPayload: (limit: number, skip: number) => BrandId & LimitSkip;
  };
  categoryQuery: {
    hook: (payload: BrandAndCategoryIds) => UseQueryResult<Category>;
    buildPayload: (categoryId: string) => BrandAndCategoryIds;
  };
  categoryMutation: {
    hook: (payload: BrandId) => UseServiceCategoryMutationResult;
    buildPayload: () => BrandId;
  };
  shopsListQuery?: {
    hook: (payload: T) => UseQueryResult<ShopsList>;
    buildPayload: () => T;
  };
  barbersListQuery?: {
    hook: (payload: T) => UseQueryResult<BarberWithPhotos[]>;
    buildPayload: () => T;
  };
  taxesListQuery: {
    hook: (payload: T) => UseQueryResult<TaxesDTO>;
    buildPayload: () => T;
  };
  serviceAssignmentMutation?: {
    hook: (payload: T) => UseServiceAssignmentMutationResult;
    buildPayload: () => T;
  };
  serviceAssignmentsList?: {
    hook: (serviceId: string | undefined) => AssignmentWithNamePhotosMinutesShop[];
    buildPayload: (serviceId: string | undefined) => string | undefined;
  };
  serviceAssignmentAction?: {
    hook: (serviceId: string | undefined) => UseServiceAssignmentActionResult;
    buildPayload: (serviceId: string | undefined) => string | undefined;
  };
}
