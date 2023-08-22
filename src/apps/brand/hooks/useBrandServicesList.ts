import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandId, Service } from '@app/interfaces';
import { BrandServiceApiService } from '@app/api';

export const useBrandServicesList = ({ brandId }: BrandId): UseQueryResult<Service[]> => {
  return useApiQuery({
    endpoint: BrandServiceApiService.brandServicesQuery,
    payload: {
      brandId,
    },
    options: {
      enabled: !!brandId,
      refetchOnMount: true,
    },
  });
};
