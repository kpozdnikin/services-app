import { useServiceApp } from '@app/hooks';
import { UseServiceDeleteResult } from '@app/interfaces';

export const useServiceDeleteMutation = (): UseServiceDeleteResult => {
  const api = useServiceApp();
  const hook = api.serviceDeleteMutation.hook;
  const payload = api.serviceDeleteMutation.buildPayload();

  return hook(payload);
};
