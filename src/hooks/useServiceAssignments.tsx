import { useServiceApp } from '@app/hooks';
import { AssignmentWithNamePhotosMinutesShop } from '@app/interfaces';

export const useServiceAssignments = (
  serviceId: string | undefined,
): AssignmentWithNamePhotosMinutesShop[] => {
  const api = useServiceApp();

  if (!api.serviceAssignmentsList) {
    return [];
  }

  const hook = api.serviceAssignmentsList.hook;
  const payload = api.serviceAssignmentsList?.buildPayload(serviceId);

  return hook(payload);
};
