import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BarberTaxesApiService } from '@app/api';
import { BarberAndShopId, TaxesDTO } from '@app/interfaces';

export const useBarberTaxesList = ({
  barberId,
  shopId,
}: BarberAndShopId): UseQueryResult<TaxesDTO> => {
  return useApiQuery({
    endpoint: BarberTaxesApiService.barberTaxesQuery,
    payload: {
      barberId,
      shopId,
    },
    options: {
      enabled: !!shopId && !!barberId,
    },
  });
};
