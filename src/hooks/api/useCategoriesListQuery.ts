import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { CategoriesDTO } from '@app/interfaces';

export const useCategoriesListQuery = (
  limit: number,
  skip: number,
): UseQueryResult<CategoriesDTO> => {
  const api = useServiceApp();
  const hook = api.categoriesListQuery.hook;
  const payload = api.categoriesListQuery.buildPayload(limit, skip);

  return hook(payload);
};
