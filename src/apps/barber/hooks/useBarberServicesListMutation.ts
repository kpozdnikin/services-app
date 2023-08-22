import { useQueryClient } from 'react-query';
import { useApiMutation } from '@getsquire/handyman/api';

import { Service } from '@app/interfaces';
import { UseServiceListMutationResult, BarberAndShopId } from '@app/interfaces';
import { BarberServiceApiService } from '@app/api';

export const useBarberServicesListMutation = (
  payload: BarberAndShopId,
): UseServiceListMutationResult => {
  const { barberId, shopId } = payload;
  const queryClient = useQueryClient();

  const updateService = useApiMutation({
    endpoint: BarberServiceApiService.updateBarberServicesOrder,
    options: {
      onError: (error, variables, context) => {
        const queryKey = BarberServiceApiService.barberServicesQuery.getKey({
          barberId,
          shopId,
        });

        queryClient.setQueryData(queryKey, context);
      },
    },
  });

  const handleUpdateOrder = (servicesOrders: Service[]) => {
    updateService.mutateAsync({
      services: servicesOrders,
      barberId,
      shopId,
    });
  };

  return {
    handleUpdateOrder,
  };
};
