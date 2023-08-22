import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandServiceApiService } from '@app/api';
import { BrandAndServiceIds, Service } from '@app/interfaces';

export const useBrandService = ({
  brandId,
  serviceId,
}: BrandAndServiceIds): UseQueryResult<Service> => {
  return useApiQuery({
    endpoint: BrandServiceApiService.brandServiceQuery,
    payload: {
      brandId,
      serviceId,
    },
    options: {
      enabled: !!brandId && !!serviceId,
      refetchOnMount: true,
    },
  });
};
