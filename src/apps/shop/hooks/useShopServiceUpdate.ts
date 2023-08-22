import { useApiMutation } from '@getsquire/handyman/api';

import { ShopServiceApiService } from '@app/api';
import {
  ShopId,
  UseServiceUpdateResult,
  SingleService,
  SingleServiceDTO,
} from '@app/interfaces';
import { mapServiceFromClientToDTO } from '@app/utils';

export const useShopServiceUpdate = (payload: ShopId): UseServiceUpdateResult => {
  const { shopId } = payload;

  const updateService = useApiMutation({
    endpoint: ShopServiceApiService.shopServiceUpdate,
  });

  const mutate = (service: SingleService) => {
    return updateService.mutateAsync({
      service: mapServiceFromClientToDTO(service) as SingleServiceDTO,
      shopId,
    });
  };

  return {
    isLoading: updateService.isLoading,
    mutate,
  };
};
