import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { Service } from '@app/interfaces';

export const useServiceQuery = (serviceId?: string): UseQueryResult<Service> => {
  const api = useServiceApp();

  if (!serviceId) {
    throw new Error('Service id not provided!');
  }

  const hook = api.serviceQuery.hook;
  const payload = api.serviceQuery.buildPayload(serviceId);

  return hook(payload);
};
