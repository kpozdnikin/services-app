import { useServiceApp } from '@app/hooks';
import { UseServiceAssignmentActionResult } from '@app/interfaces';

export const useServiceAssignmentAction = (
  serviceId?: string,
): UseServiceAssignmentActionResult => {
  const api = useServiceApp();

  if (!api.serviceAssignmentAction) {
    throw new Error('You have no permissions to do that');
  }

  const hook = api.serviceAssignmentAction.hook;
  const payload = api.serviceAssignmentAction.buildPayload(serviceId);

  return hook(payload);
};
