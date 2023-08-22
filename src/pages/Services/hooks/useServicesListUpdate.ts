import { useServiceApp } from '@app/hooks';

export const useServicesListUpdate = () => {
  const api = useServiceApp();
  const hook = api.listMutation.hook;
  const payload = api?.listMutation?.buildPayload();

  return hook(payload);
};
