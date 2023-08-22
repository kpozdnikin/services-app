import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { ShopServiceApiService } from '@app/api';
import { Service, ShopAndServiceIds } from '@app/interfaces';

export const useShopService = ({
  shopId,
  serviceId,
}: ShopAndServiceIds): UseQueryResult<Service> => {
  return useApiQuery({
    endpoint: ShopServiceApiService.shopServiceQuery,
    payload: {
      shopId,
      serviceId,
    },
    options: {
      enabled: !!shopId && !!serviceId,
      refetchOnMount: true,
    },
  });
};
