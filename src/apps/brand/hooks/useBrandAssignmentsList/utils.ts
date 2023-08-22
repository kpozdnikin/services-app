import { Brand, Shop } from '@getsquire/sage/types';

import {
  Assignment,
  AssignmentWithNamePhotosMinutesShop,
  BarberWithPhotos,
  Service,
} from '@app/interfaces';
import { Nullable } from '@app/types';
import {
  DEFAULT_MIN_INTERVAL,
  fullName,
  getMinuteOptionsForMinInterval,
} from '@app/utils';

interface GetAssignmentsForBarberArgs {
  service: Service;
  minuteOptions: number[];
  shopItem: Shop;
  barberItem: BarberWithPhotos;
  targetAssignment?: Assignment;
  serviceId: Nullable<string>;
  brandId: string;
}

const getAssignmentsForBarber = ({
  service,
  minuteOptions,
  shopItem,
  barberItem,
  targetAssignment,
  serviceId,
  brandId,
}: GetAssignmentsForBarberArgs): AssignmentWithNamePhotosMinutesShop => {
  // for the shop user we are trying to find assignment in service.assignments root
  const targetBarberAssignment = targetAssignment?.assignments?.find(
    (assignment) => assignment.assigneeId === barberItem.id,
  );

  return {
    assignments: [],
    assigneeId: barberItem.id,
    assignmentId: targetBarberAssignment?.assignmentId ?? barberItem.id,
    assignmentType: 'barber',
    brandId,
    cost: targetBarberAssignment?.cost ?? targetAssignment?.cost ?? 0,
    enabled: !!targetBarberAssignment,
    duration:
      targetBarberAssignment?.duration ?? targetAssignment?.duration ?? service.duration,
    itemName: fullName(barberItem as BarberWithPhotos),
    kioskEnabled:
      targetBarberAssignment?.kioskEnabled ??
      targetAssignment?.kioskEnabled ??
      service.kioskEnabled,
    minuteOptions,
    order: targetBarberAssignment?.order ?? 0,
    parentId: targetAssignment?.assignmentId ?? shopItem.id,
    photos: barberItem.photos,
    requiresPrepaid:
      targetBarberAssignment?.requiresPrepaid ??
      targetAssignment?.requiresPrepaid ??
      service.requiresPrepaid,
    serviceId,
    shopId: shopItem.id,
    taxes: targetBarberAssignment?.taxes ?? [],
    visibility: targetBarberAssignment?.enabled ?? !!targetAssignment?.enabled,
  };
};

interface CreateUpdatedAssignmentArgs {
  shopItem: Shop;
  service: Service;
  brand?: Nullable<Brand>;
  serviceId?: Nullable<string>;
}

export const createUpdatedAssignmentForShop = ({
  shopItem,
  brand,
  service,
  serviceId,
}: CreateUpdatedAssignmentArgs): AssignmentWithNamePhotosMinutesShop => {
  const { minuteOptions } = getMinuteOptionsForMinInterval(
    shopItem?.minInterval ?? DEFAULT_MIN_INTERVAL,
  );

  // for the shop user we trying to find assignment in service root
  const targetAssignment = service.assignments?.find(
    (assignment) => assignment.assigneeId === shopItem.id,
  );

  const updatedAssignment: AssignmentWithNamePhotosMinutesShop = {
    assignments: [],
    assigneeId: shopItem.id,
    assignmentId: targetAssignment?.assignmentId ?? shopItem.id,
    assignmentType: 'shop',
    brandId: brand?.id ?? '',
    cost: targetAssignment?.cost ?? service.cost,
    enabled: !!targetAssignment,
    duration: targetAssignment?.duration ?? service.duration,
    itemName: shopItem.alias || shopItem.name,
    kioskEnabled: targetAssignment?.kioskEnabled ?? service.kioskEnabled,
    minuteOptions,
    order: targetAssignment?.order ?? 0,
    parentId: null,
    photos: [],
    requiresPrepaid: targetAssignment?.requiresPrepaid ?? service.requiresPrepaid,
    serviceId: serviceId ?? null,
    shopId: shopItem.id,
    taxes: targetAssignment?.taxes ?? [],
    visibility: targetAssignment?.visibility ?? targetAssignment?.enabled ?? false,
  };

  updatedAssignment.assignments = (shopItem.barbers as BarberWithPhotos[])
    ?.sort((a, b) => a.order - b.order)
    .map((barber) =>
      getAssignmentsForBarber({
        service,
        minuteOptions,
        shopItem,
        barberItem: barber,
        targetAssignment,
        brandId: brand?.id ?? '',
        serviceId: serviceId ?? null,
      }),
    );

  return updatedAssignment;
};
