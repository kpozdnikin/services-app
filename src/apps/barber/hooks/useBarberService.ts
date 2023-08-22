import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BarberShopAndServiceIds, Service } from '@app/interfaces';
import { BarberServiceApiService } from '@app/api';

export const useBarberService = ({
  barberId,
  shopId,
  serviceId,
}: BarberShopAndServiceIds): UseQueryResult<Service> => {
  return useApiQuery({
    endpoint: BarberServiceApiService.barberServiceQuery,
    payload: {
      barberId,
      shopId,
      serviceId,
    },
    options: {
      enabled: !!barberId && !!shopId && !!serviceId,
      refetchOnMount: true,
    },
  });
};
