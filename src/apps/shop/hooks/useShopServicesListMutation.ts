import { useQueryClient } from 'react-query';
import { useApiMutation } from '@getsquire/handyman/api';

import { UseServiceListMutationResult, ShopId, Service } from '@app/interfaces';
import { ShopServiceApiService } from '@app/api';

export const useShopServicesListMutation = (
  payload: ShopId,
): UseServiceListMutationResult => {
  const { shopId } = payload;
  const queryClient = useQueryClient();

  const updateService = useApiMutation({
    endpoint: ShopServiceApiService.updateShopServicesOrder,
    options: {
      onError: (error, variables, context) => {
        const queryKey = ShopServiceApiService.shopServicesQuery.getKey({
          shopId,
        });

        queryClient.setQueryData(queryKey, context);
      },
    },
  });

  const handleUpdateOrder = async (servicesOrders: Service[]) => {
    await updateService.mutateAsync({
      services: servicesOrders,
      shopId,
    });
  };

  return {
    handleUpdateOrder,
  };
};
