import { useApiMutation } from '@getsquire/handyman/api';

import { ShopServiceApiService } from '@app/api';
import { WithoutId } from '@app/types';
import { ShopId, UseServiceAddResult, SingleService } from '@app/interfaces';
import { mapServiceFromClientToDTO } from '@app/utils';

export const useShopServiceAdd = (payload: ShopId): UseServiceAddResult => {
  const { shopId } = payload;

  const addService = useApiMutation({
    endpoint: ShopServiceApiService.shopServiceAdd,
  });

  const mutate = (service: WithoutId<SingleService>) => {
    return addService.mutateAsync({
      service: mapServiceFromClientToDTO(service),
      shopId,
    });
  };

  return {
    isLoading: addService.isLoading,
    mutate,
  };
};
