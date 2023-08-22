import { useApiMutation } from '@getsquire/handyman/api';

import { BrandId, UseServiceListMutationResult, Service } from '@app/interfaces';
import { BrandServiceApiService } from '@app/api';

export const useBrandServicesListMutation = (
  payload: BrandId,
): UseServiceListMutationResult => {
  const { brandId } = payload;

  const updateService = useApiMutation({
    endpoint: BrandServiceApiService.updateBrandServicesOrder,
  });

  const handleUpdateOrder = async (servicesOrders: Service[]) => {
    await updateService.mutateAsync({
      services: servicesOrders,
      brandId,
    });
  };

  return {
    handleUpdateOrder,
  };
};
