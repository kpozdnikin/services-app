import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { ShopsList } from '@app/interfaces';

export const useShopsListQuery = (): UseQueryResult<ShopsList> => {
  const api = useServiceApp();

  if (!api.shopsListQuery) {
    throw new Error('You have no permissions to do that');
  }

  const hook = api.shopsListQuery.hook;
  const payload = api.shopsListQuery?.buildPayload();

  return hook(payload);
};
