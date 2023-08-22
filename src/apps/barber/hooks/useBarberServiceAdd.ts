import { useApiMutation } from '@getsquire/handyman/api';

import { WithoutId } from '@app/types';
import { BarberServiceApiService } from '@app/api';
import { BarberAndShopId, UseServiceAddResult, SingleService } from '@app/interfaces';
import { mapServiceFromClientToDTO } from '@app/utils';

export const useBarberServiceAdd = (payload: BarberAndShopId): UseServiceAddResult => {
  const { barberId, shopId } = payload;

  const addService = useApiMutation({
    endpoint: BarberServiceApiService.barberServiceAdd,
  });

  const mutate = (service: WithoutId<SingleService>) => {
    return addService.mutateAsync({
      service: mapServiceFromClientToDTO(service),
      barberId,
      shopId,
    });
  };

  return {
    isLoading: addService.isLoading,
    mutate,
  };
};
