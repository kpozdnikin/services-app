import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandId, ShopsList } from '@app/interfaces';
import { BrandShopApiService } from '@app/api';

export const useBrandShopsList = ({ brandId }: BrandId): UseQueryResult<ShopsList> => {
  return useApiQuery({
    endpoint: BrandShopApiService.brandShopsQuery,
    payload: {
      brandId,
    },
    options: {
      enabled: !!brandId,
    },
  });
};
