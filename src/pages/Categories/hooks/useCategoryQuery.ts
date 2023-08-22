import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { Category } from '@app/interfaces';

export const useCategoryQuery = (categoryId?: string): UseQueryResult<Category> => {
  const api = useServiceApp();

  if (!categoryId) {
    throw new Error('Category id not provided!');
  }

  const hook = api.categoryQuery.hook;
  const payload = api.categoryQuery.buildPayload(categoryId);

  return hook(payload);
};
