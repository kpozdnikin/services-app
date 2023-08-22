import { useServiceApp } from '@app/hooks';
import { UseServiceUpdateResult } from '@app/interfaces';

export const useServiceUpdateMutation = (): UseServiceUpdateResult => {
  const api = useServiceApp();
  const hook = api.serviceUpdateMutation.hook;
  const payload = api.serviceUpdateMutation.buildPayload();

  return hook(payload);
};
