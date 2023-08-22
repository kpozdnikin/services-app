import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { ShopId, BarberWithPhotos } from '@app/interfaces';
import { ShopBarberApiService } from '@app/api';

export const useShopBarbersList = ({
  shopId,
}: ShopId): UseQueryResult<BarberWithPhotos[]> => {
  return useApiQuery({
    endpoint: ShopBarberApiService.shopBarbersQuery,
    payload: {
      shopId,
    },
    options: {
      enabled: !!shopId,
    },
  });
};
