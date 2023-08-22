import { AssignmentWithNamePhotosMinutesShop } from '@app/interfaces';
import { DEFAULT_MIN_INTERVAL, getMinuteOptionsForMinInterval } from '@app/utils';
import {
  useServiceApp,
  useServiceQuery,
  useShopsListQuery,
  useBarbersListQuery,
} from '@app/hooks';

import {
  getAssignmentsForBarber,
  getAssignmentsForShop,
} from '../assignmentsDataMappers';

export const useShopAssignmentsList = (
  serviceId: string | undefined,
): AssignmentWithNamePhotosMinutesShop[] => {
  const { brand } = useServiceApp();
  const { data: service } = useServiceQuery(serviceId);
  const barbersResponse = useBarbersListQuery();
  const { data: shopsResponse } = useShopsListQuery();
  const shops = shopsResponse?.shops ?? [];
  const barbers = barbersResponse.data ?? [];

  const newAssignments: AssignmentWithNamePhotosMinutesShop[] = [];

  if (shops?.length && service) {
    shops.forEach((shopItem) => {
      const { minuteOptions } = getMinuteOptionsForMinInterval(
        shopItem?.minInterval ?? DEFAULT_MIN_INTERVAL,
      );

      const newAssignment: AssignmentWithNamePhotosMinutesShop = getAssignmentsForShop(
        brand,
        service,
        minuteOptions,
        shopItem,
      );

      newAssignment.assignments = barbers
        ?.sort((a, b) => a.order - b.order)
        .map((barber) =>
          getAssignmentsForBarber(brand, service, minuteOptions, shopItem, barber),
        );

      newAssignments.push(newAssignment);
    });
  }

  return newAssignments;
};
