import { RENTAL_SHOP_KIND } from '@getsquire/sage/domain';

import {
  ApiConfig,
  ApiInitialConfig,
  BarberAndShopId,
  SingleService,
} from '@app/interfaces';
import { getPermissions } from '@app/apps/utils';
import {
  useBrandServiceCategoriesList,
  useBrandServiceCategory,
  useBrandServiceCategoryMutation,
} from '@app/apps/brand/hooks';

import {
  useBarberService,
  useBarberTaxesList,
  useBarberServicesList,
  useBarberServicesListExport,
  useBarberServicesListMutation,
  useBarberServiceAdd,
  useBarberServiceUpdate,
  useBarberServiceDelete,
} from './hooks';

export const createBarberApiConfig = (
  initialConfig: ApiInitialConfig,
): ApiConfig<BarberAndShopId> => {
  const {
    canAddServices,
    canModifyServices,
    canModifyCategories,
    canOpenCategories,
    canOpenServices,
    canSortServices,
    canViewServices,
  } = getPermissions(initialConfig);

  const shopId = initialConfig.shop?.id || '';
  const barberId = initialConfig.barber?.id || '';
  const brandId = initialConfig.barber?.shop?.brandId || '';
  const brand = initialConfig.brand;
  const shop = initialConfig.shop;
  const view = initialConfig.view;

  const getEditPermissionsByService = (service?: SingleService) => {
    const isCreatedByCurrentUser =
      (view?.kind !== 'admin' ? view?.viewer.id : null) === service?.createdById;
    const isCreatedByBarber = service?.createdBy === 'barber';

    // After creating a service, commission barber cannot edit name or description of that service
    // Rental barbers keep all service fields as editable if they are the creator of that service.
    // if the brand or shop was the creator of the service, the rental barber sees the same locks as commission barber and shop.
    const isRentalBarber = shop?.kind === RENTAL_SHOP_KIND;
    const isRentalBarberAndCreator =
      isRentalBarber && isCreatedByBarber && isCreatedByCurrentUser;

    return {
      canEditCategory: isRentalBarberAndCreator,
      canEditServiceNameOrDescription: isRentalBarberAndCreator,
    };
  };

  return {
    barber: initialConfig.barber,
    brand,
    currency: initialConfig.currency,
    shop,
    shops: initialConfig.shops,
    userKind: initialConfig.userKind,
    features: {
      canAddServices,
      canModifyServices,
      canModifyCategories,
      canOpenCategories,
      canOpenServices,
      canSortServices,
      canViewServices,
      canAssignService: false,
    },
    view,
    getEditPermissionsByService,
    listExport: {
      hook: useBarberServicesListExport,
      buildPayload: (userName?: string) => ({
        barberId,
        shopId,
        userName,
      }),
    },
    listQuery: {
      hook: useBarberServicesList,
      buildPayload: () => ({
        barberId,
        shopId,
      }),
    },
    listMutation: {
      hook: useBarberServicesListMutation,
      buildPayload: () => ({
        barberId,
        shopId,
      }),
    },
    serviceQuery: {
      hook: useBarberService,
      buildPayload: (serviceId: string) => ({
        serviceId,
        barberId,
        shopId,
      }),
    },
    serviceAddMutation: {
      hook: useBarberServiceAdd,
      buildPayload: () => ({
        barberId,
        shopId,
      }),
    },
    serviceUpdateMutation: {
      hook: useBarberServiceUpdate,
      buildPayload: () => ({
        barberId,
        shopId,
      }),
    },
    serviceDeleteMutation: {
      hook: useBarberServiceDelete,
      buildPayload: () => ({
        barberId,
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
      hook: useBarberTaxesList,
      buildPayload: () => ({
        barberId,
        shopId,
      }),
    },
  };
};
