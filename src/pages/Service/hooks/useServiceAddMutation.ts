import { useServiceApp } from '@app/hooks';
import { UseServiceAddResult } from '@app/interfaces';

export const useServiceAddMutation = (): UseServiceAddResult => {
  const api = useServiceApp();
  const hook = api.serviceAddMutation.hook;
  const payload = api.serviceAddMutation.buildPayload();

  return hook(payload);
};
