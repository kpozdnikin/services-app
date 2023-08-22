import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandId, TaxesDTO } from '@app/interfaces';
import { BrandTaxesApiService } from '@app/api';

export const useBrandTaxesList = ({ brandId }: BrandId): UseQueryResult<TaxesDTO> => {
  return useApiQuery({
    endpoint: BrandTaxesApiService.brandTaxesQuery,
    payload: {
      brandId,
    },
    options: {
      enabled: !!brandId,
    },
  });
};
