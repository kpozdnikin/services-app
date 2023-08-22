import { Brand, Shop } from '@getsquire/sage/types';

import { Nullable } from '@app/types';
import {
  AssignmentWithNamePhotosMinutesShop,
  BarberWithPhotos,
  Service,
  Tax,
} from '@app/interfaces';
import { fullName } from '@app/utils';

export const getAssignmentsForShop = (
  brand: Nullable<Brand> | undefined,
  service: Service,
  minuteOptions: number[],
  shopItem: Shop,
): AssignmentWithNamePhotosMinutesShop => ({
  assignments: [],
  assigneeId: shopItem.id,
  assignmentId: shopItem.id,
  assignmentType: 'shop',
  brandId: brand?.id ?? '',
  cost: service.cost,
  enabled: !!service.assignments?.length,
  duration: service.duration,
  itemName: shopItem.alias || shopItem.name,
  kioskEnabled: service.kioskEnabled,
  minuteOptions,
  order: service.order,
  parentId: null,
  photos: [],
  requiresPrepaid: service.requiresPrepaid,
  serviceId: service.id ?? null,
  shopId: shopItem.id,
  taxes: service.taxes as Tax[],
  visibility: service?.enabled ?? false,
});

export const getAssignmentsForBarber = (
  brand: Nullable<Brand> | undefined,
  service: Service,
  minuteOptions: number[],
  shopItem: Shop,
  barberItem: BarberWithPhotos,
): AssignmentWithNamePhotosMinutesShop => {
  // for the shop user we are trying to find assignment in service.assignments root
  const targetBarberAssignment = service?.assignments?.find(
    (assignment) => assignment.assigneeId === barberItem.id,
  );

  return {
    assignments: [],
    assigneeId: barberItem.id,
    assignmentId: targetBarberAssignment?.assignmentId ?? barberItem.id,
    assignmentType: 'barber',
    brandId: brand?.id ?? '',
    cost: targetBarberAssignment?.cost ?? service?.cost ?? 0,
    enabled: !!targetBarberAssignment,
    duration: targetBarberAssignment?.duration ?? service.duration,
    itemName: fullName(barberItem as BarberWithPhotos),
    kioskEnabled: targetBarberAssignment?.kioskEnabled ?? service.kioskEnabled,
    minuteOptions,
    order: targetBarberAssignment?.order ?? 0,
    parentId: shopItem.id,
    photos: barberItem.photos,
    requiresPrepaid: targetBarberAssignment?.requiresPrepaid ?? service.requiresPrepaid,
    serviceId: service.id ?? null,
    shopId: shopItem.id,
    taxes: targetBarberAssignment?.taxes ?? [],
    visibility: targetBarberAssignment?.enabled ?? !!service?.enabled,
  };
};
