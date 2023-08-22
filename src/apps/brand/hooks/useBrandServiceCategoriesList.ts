import { useApiQuery } from '@getsquire/handyman/api';
import { UseQueryResult } from 'react-query';

import { BrandId, CategoriesDTO } from '@app/interfaces';
import { BrandServiceCategoryApiService } from '@app/api';

interface Args extends BrandId {
  limit: number;
  skip: number;
}

export const useBrandServiceCategoriesList = ({
  brandId,
  limit,
  skip,
}: Args): UseQueryResult<CategoriesDTO> => {
  return useApiQuery({
    endpoint: BrandServiceCategoryApiService.brandServiceCategories,
    payload: {
      brandId,
      limit,
      skip,
    },
    options: {
      enabled: !!brandId,
    },
  });
};
