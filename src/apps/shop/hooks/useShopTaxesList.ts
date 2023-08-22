import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { ShopId, TaxesDTO } from '@app/interfaces';
import { ShopTaxesApiService } from '@app/api';

export const useShopTaxesList = ({ shopId }: ShopId): UseQueryResult<TaxesDTO> => {
  return useApiQuery({
    endpoint: ShopTaxesApiService.shopTaxesQuery,
    payload: {
      shopId,
    },
    options: {
      enabled: !!shopId,
    },
  });
};
