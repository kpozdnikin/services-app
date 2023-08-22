import { useServiceApp } from '@app/hooks';
import { UseServiceAssignmentMutationResult } from '@app/interfaces';

export const useServiceAssignmentMutation = (): UseServiceAssignmentMutationResult => {
  const api = useServiceApp();

  if (!api.serviceAssignmentMutation) {
    throw new Error('You have no permissions to do that');
  }

  const hook = api.serviceAssignmentMutation.hook;
  const payload = api.serviceAssignmentMutation.buildPayload();

  return hook(payload);
};
