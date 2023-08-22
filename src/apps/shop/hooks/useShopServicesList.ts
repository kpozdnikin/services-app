import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { Service, ShopId } from '@app/interfaces';
import { ShopServiceApiService } from '@app/api';

export const useShopServicesList = ({ shopId }: ShopId): UseQueryResult<Service[]> => {
  return useApiQuery({
    endpoint: ShopServiceApiService.shopServicesQuery,
    payload: {
      shopId,
    },
    options: {
      enabled: !!shopId,
      refetchOnMount: true,
    },
  });
};
