import { useApiMutation } from '@getsquire/handyman/api';

import { ShopId, UseServiceDeleteResult } from '@app/interfaces';
import { ShopServiceApiService } from '@app/api';

export const useShopServiceDelete = (payload: ShopId): UseServiceDeleteResult => {
  const { shopId } = payload;

  const deleteService = useApiMutation({
    endpoint: ShopServiceApiService.shopServiceDelete,
  });

  const mutate = async (serviceId: string) => {
    await deleteService.mutateAsync({
      shopId,
      serviceId,
    });
  };

  return {
    isLoading: deleteService.isLoading,
    mutate,
  };
};
