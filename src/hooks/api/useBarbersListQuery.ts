import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { BarberWithPhotos } from '@app/interfaces';

export const useBarbersListQuery = (): UseQueryResult<BarberWithPhotos[]> => {
  const api = useServiceApp();

  if (!api.barbersListQuery) {
    throw new Error('You have no permissions to to that');
  }

  const hook = api.barbersListQuery.hook;
  const payload = api.barbersListQuery?.buildPayload();

  return hook(payload);
};
