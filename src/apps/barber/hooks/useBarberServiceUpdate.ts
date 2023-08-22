import { useApiMutation } from '@getsquire/handyman/api';

import { BarberServiceApiService } from '@app/api';
import {
  BarberAndShopId,
  UseServiceUpdateResult,
  SingleService,
  SingleServiceDTO,
} from '@app/interfaces';
import { mapServiceFromClientToDTO } from '@app/utils';

export const useBarberServiceUpdate = (
  payload: BarberAndShopId,
): UseServiceUpdateResult => {
  const { barberId, shopId } = payload;

  const updateService = useApiMutation({
    endpoint: BarberServiceApiService.barberServiceUpdate,
  });

  const mutate = (service: SingleService) => {
    return updateService.mutateAsync({
      service: mapServiceFromClientToDTO(service) as SingleServiceDTO,
      barberId,
      shopId,
    });
  };

  return {
    isLoading: updateService.isLoading,
    mutate,
  };
};
