import { ApiConfig, ApiInitialConfig, ShopId } from '@app/interfaces';
import { getPermissions } from '@app/apps/utils';
import {
  useBrandServiceCategory,
  useBrandServiceCategoryMutation,
  useBrandServiceCategoriesList,
} from '@app/apps/brand/hooks';

import {
  useShopBarbersList,
  useShopService,
  useShopsList,
  useShopServicesList,
  useShopServicesListExport,
  useShopServicesListMutation,
  useShopTaxesList,
  useShopAssignmentsList,
  useShopServiceAssignmentAction,
  useShopServiceAssignmentManagement,
  useShopServiceAdd,
  useShopServiceDelete,
  useShopServiceUpdate,
} from './hooks';

export const createShopApiConfig = (
  initialConfig: ApiInitialConfig,
): ApiConfig<ShopId> => {
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
  const shopId = initialConfig.shop?.id ?? '';
  const brand = initialConfig.brand;
  const shop = initialConfig.shop;
  const view = initialConfig.view;

  const getEditPermissionsByService = () => {
    const isNoBrandOrSingleShopBrand = !brand || brand.shopCount === 1;

    return {
      canEditCategory: true,
      canEditServiceNameOrDescription: isNoBrandOrSingleShopBrand,
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
      hook: useShopServicesListExport,
      buildPayload: (userName?: string) => ({
        shopId,
        userName,
      }),
    },
    listQuery: {
      hook: useShopServicesList,
      buildPayload: () => ({
        shopId,
      }),
    },
    listMutation: {
      hook: useShopServicesListMutation,
      buildPayload: () => ({
        shopId,
      }),
    },
    serviceQuery: {
      hook: useShopService,
      buildPayload: (serviceId: string) => ({
        serviceId,
        shopId,
      }),
    },
    serviceAddMutation: {
      hook: useShopServiceAdd,
      buildPayload: () => ({
        shopId,
      }),
    },
    serviceDeleteMutation: {
      hook: useShopServiceDelete,
      buildPayload: () => ({
        shopId,
      }),
    },
    serviceUpdateMutation: {
      hook: useShopServiceUpdate,
      buildPayload: () => ({
        shopId,
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
      hook: useShopTaxesList,
      buildPayload: () => ({
        shopId,
      }),
    },
    shopsListQuery: {
      hook: useShopsList,
      buildPayload: () => ({
        shopId,
      }),
    },
    barbersListQuery: {
      hook: useShopBarbersList,
      buildPayload: () => ({
        shopId,
      }),
    },
    serviceAssignmentMutation: {
      hook: useShopServiceAssignmentManagement,
      buildPayload: () => ({
        shopId,
      }),
    },
    serviceAssignmentsList: {
      hook: useShopAssignmentsList,
      buildPayload: (serviceId: string | undefined) => serviceId,
    },
    serviceAssignmentAction: {
      hook: useShopServiceAssignmentAction,
      buildPayload: (serviceId: string | undefined) => serviceId,
    },
  };
};
