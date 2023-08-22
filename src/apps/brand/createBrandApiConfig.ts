import { ApiConfig, ApiInitialConfig, BrandId } from '@app/interfaces';
import { getPermissions } from '@app/apps/utils';

import {
  useBrandService,
  useBrandServiceCategoriesList,
  useBrandServiceCategory,
  useBrandServiceCategoryMutation,
  useBrandShopsList,
  useBrandTaxesList,
  useBrandServicesList,
  useBrandServicesListExport,
  useBrandServicesListMutation,
  useBrandAssignmentsList,
  useBrandServiceAssignmentAction,
  useBrandServiceAssignmentManagement,
  useBrandServiceAdd,
  useBrandServiceDelete,
  useBrandServiceUpdate,
} from './hooks';

export const createBrandApiConfig = (
  initialConfig: ApiInitialConfig,
): ApiConfig<BrandId> => {
  const {
    canAddServices,
    canModifyServices,
    canModifyCategories,
    canOpenCategories,
    canOpenServices,
    canSortServices,
    canViewServices,
  } = getPermissions(initialConfig);

  const brandId = initialConfig.brand?.id ?? '';
  const brand = initialConfig.brand;
  const shop = initialConfig.shop;
  const view = initialConfig.view;

  const getEditPermissionsByService = () => {
    return {
      canEditCategory: true,
      canEditServiceNameOrDescription: true,
    };
  };

  return {
    barber: initialConfig.barber,
    brand,
    currency: initialConfig.currency,
    shop,
    shops: initialConfig.shops,
    userKind: initialConfig.userKind,
    getEditPermissionsByService,
    features: {
      canAddServices,
      canModifyServices,
      canModifyCategories,
      canOpenCategories,
      canOpenServices,
      canSortServices,
      canViewServices,
      canAssignService: true,
    },
    view,
    listExport: {
      hook: useBrandServicesListExport,
      buildPayload: (userName?: string) => ({
        brandId,
        userName,
      }),
    },
    listQuery: {
      hook: useBrandServicesList,
      buildPayload: () => ({
        brandId,
      }),
    },
    listMutation: {
      hook: useBrandServicesListMutation,
      buildPayload: () => ({
        brandId,
      }),
    },
    serviceQuery: {
      hook: useBrandService,
      buildPayload: (serviceId: string) => ({
        serviceId,
        brandId,
      }),
    },
    serviceAddMutation: {
      hook: useBrandServiceAdd,
      buildPayload: () => ({
        brandId,
      }),
    },
    serviceDeleteMutation: {
      hook: useBrandServiceDelete,
      buildPayload: () => ({
        brandId,
      }),
    },
    serviceUpdateMutation: {
      hook: useBrandServiceUpdate,
      buildPayload: () => ({
        brandId,
      }),
    },
    categoriesListQuery: {
      hook: useBrandServiceCategoriesList,
      buildPayload: (limit: number, skip: number) => ({
        brandId,
        limit,
        skip,
      }),
    },
    categoryQuery: {
      hook: useBrandServiceCategory,
      buildPayload: (categoryId: string) => ({
        brandId,
        categoryId,
      }),
    },
    categoryMutation: {
      hook: useBrandServiceCategoryMutation,
      buildPayload: () => ({
        brandId,
      }),
    },
    taxesListQuery: {
      hook: useBrandTaxesList,
      buildPayload: () => ({
        brandId,
      }),
    },
    shopsListQuery: {
      hook: useBrandShopsList,
      buildPayload: () => ({
        brandId,
      }),
    },
    serviceAssignmentMutation: {
      hook: useBrandServiceAssignmentManagement,
      buildPayload: () => ({
        brandId,
      }),
    },
    serviceAssignmentsList: {
      hook: useBrandAssignmentsList,
      buildPayload: (serviceId: string | undefined) => serviceId,
    },
    serviceAssignmentAction: {
      hook: useBrandServiceAssignmentAction,
      buildPayload: (serviceId: string | undefined) => serviceId,
    },
  };
};
