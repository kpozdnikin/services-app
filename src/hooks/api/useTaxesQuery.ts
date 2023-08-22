import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { TaxesDTO } from '@app/interfaces';

export const useTaxesQuery = (): UseQueryResult<TaxesDTO> => {
  const api = useServiceApp();
  const hook = api.taxesListQuery.hook;
  const payload = api?.taxesListQuery?.buildPayload();

  return hook(payload);
};
