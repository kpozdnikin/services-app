import { useServiceApp, useServiceQuery, useShopsListQuery } from '@app/hooks';
import { AssignmentWithNamePhotosMinutesShop } from '@app/interfaces';

import { createUpdatedAssignmentForShop } from './utils';

export const useBrandAssignmentsList = (
  serviceId: string | undefined,
): AssignmentWithNamePhotosMinutesShop[] => {
  const { brand } = useServiceApp();
  const { data: service } = useServiceQuery(serviceId);
  const { data: shopsResponse } = useShopsListQuery();
  const shops = shopsResponse?.shops ?? [];

  if (shops?.length && service) {
    return shops.map((shopItem) =>
      createUpdatedAssignmentForShop({
        shopItem,
        service,
        brand,
        serviceId,
      }),
    );
  }

  return [];
};
