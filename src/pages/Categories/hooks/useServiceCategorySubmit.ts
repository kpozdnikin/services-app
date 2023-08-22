import { useServiceApp } from '@app/hooks';

export const useServiceCategorySubmit = () => {
  const api = useServiceApp();
  const hook = api.categoryMutation.hook;
  const payload = api.categoryMutation.buildPayload();

  return hook(payload);
};
