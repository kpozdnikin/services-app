import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { Service } from '@app/interfaces';

export const useServicesListQuery = (): UseQueryResult<Service[]> => {
  const api = useServiceApp();
  const hook = api.listQuery.hook;
  const payload = api?.listQuery?.buildPayload();

  return hook(payload);
};
