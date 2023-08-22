import { useApiMutation } from '@getsquire/handyman/api';

import { BarberAndShopId, UseServiceDeleteResult } from '@app/interfaces';
import { BarberServiceApiService } from '@app/api';

export const useBarberServiceDelete = (
  payload: BarberAndShopId,
): UseServiceDeleteResult => {
  const { barberId, shopId } = payload;

  const deleteService = useApiMutation({
    endpoint: BarberServiceApiService.barberServiceDelete,
  });

  const mutate = async (serviceId: string) => {
    await deleteService.mutateAsync({
      barberId,
      shopId,
      serviceId,
    });
  };

  return {
    isLoading: deleteService.isLoading,
    mutate,
  };
};
