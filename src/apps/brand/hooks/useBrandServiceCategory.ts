import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandAndCategoryIds, Category } from '@app/interfaces';
import { BrandServiceCategoryApiService } from '@app/api';

export const useBrandServiceCategory = ({
  brandId,
  categoryId,
}: BrandAndCategoryIds): UseQueryResult<Category> => {
  return useApiQuery({
    endpoint: BrandServiceCategoryApiService.brandServiceCategory,
    payload: {
      brandId,
      categoryId,
    },
    options: {
      enabled: !!brandId && !!categoryId,
    },
  });
};
