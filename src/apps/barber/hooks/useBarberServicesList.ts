import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { Service, BarberAndShopId } from '@app/interfaces';
import { BarberServiceApiService } from '@app/api';

export const useBarberServicesList = ({
  barberId,
  shopId,
}: BarberAndShopId): UseQueryResult<Service[]> => {
  return useApiQuery({
    endpoint: BarberServiceApiService.barberServicesQuery,
    payload: {
      barberId,
      shopId,
    },
    options: {
      enabled: !!shopId && !!barberId,
      refetchOnMount: true,
    },
  });
};
