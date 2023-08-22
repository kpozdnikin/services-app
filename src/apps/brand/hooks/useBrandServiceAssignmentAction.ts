import { useState } from 'react';
import { Shop } from '@getsquire/sage/types';
import omit from 'lodash/omit';

import {
  Assignment,
  AssignmentWithNamePhotosMinutesShop,
  LoadingAssignments,
  UseServiceAssignmentActionResult,
} from '@app/interfaces';
import { USER_KIND_BARBER, USER_KIND_SHOP } from '@app/constants';
import {
  useServiceQuery,
  useShopsListQuery,
  useServiceAssignmentMutation,
} from '@app/hooks';

export const useBrandServiceAssignmentAction = (
  serviceId: string | undefined,
): UseServiceAssignmentActionResult => {
  const { data: service } = useServiceQuery(serviceId);
  const { data: shopsResponse } = useShopsListQuery();
  const shops = shopsResponse?.shops ?? [];

  const [loadingAssignments, setLoadingAssignments] = useState<LoadingAssignments>({});

  const { assign, deleteAssignment, saveAssignment } = useServiceAssignmentMutation();

  const setLoading = (loading: boolean, assignmentId: string) => {
    setLoadingAssignments((prevLoading) => ({ ...prevLoading, [assignmentId]: loading }));
  };

  const setLoadingArray = (loading: boolean, ids: string[]) => {
    const loadingIdsMap: LoadingAssignments = {};

    ids.forEach((id: string) => {
      loadingIdsMap[id] = loading;
    });

    setLoadingAssignments((prevLoading) => ({ ...prevLoading, ...loadingIdsMap }));
  };

  const callTheApi = async (assignmentLoadingId: string, call: Function) => {
    setLoading(true, assignmentLoadingId);
    await call();
    setLoading(false, assignmentLoadingId);
  };

  const assignBarbers = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
    barberIds: string[],
    targetShopId: string,
  ) => {
    setLoadingArray(true, barberIds);
    await assign(serviceId, assignment, barberIds, targetShopId);
    setLoadingArray(false, barberIds);
  };

  const toggleShopAssignment = async (
    assignment: AssignmentWithNamePhotosMinutesShop,
    onlyThisBarberId?: string,
  ) => {
    if (!assignment.assigneeId || !deleteAssignment || !serviceId) {
      return;
    }

    if (!assignment.enabled && assignment.assigneeId) {
      await callTheApi(assignment.assignmentId, () =>
        deleteAssignment(serviceId, assignment),
      );

      return;
    }

    const newAssignment = omit(assignment, ['photos', 'minuteOptions', 'itemName']);

    // call this only for shop
    await callTheApi(assignment.assignmentId, () =>
      saveAssignment(serviceId, {
        ...newAssignment,
        enabled: null,
      }),
    );

    const targetShop = shops.find((shopItem) => shopItem.id === assignment.assigneeId);

    if (!targetShop) {
      return;
    }

    const barberIds = onlyThisBarberId
      ? [onlyThisBarberId]
      : targetShop.barbers.map((barberItem) => barberItem.id);

    await assignBarbers(serviceId, assignment, barberIds, targetShop.id);
  };

  const getUpdatedBarberIdsList = (
    targetShop: Shop,
    assignment: AssignmentWithNamePhotosMinutesShop,
    targetAssignment: Assignment,
  ) => {
    const barberIds = targetShop.barbers
      .map((barberItem) => barberItem.id)
      .filter((barberId) =>
        targetAssignment.assignments?.find(
          (serviceAssignment) => barberId === serviceAssignment.assigneeId,
        ),
      );

    // remove barbersId from assignment if disabled
    if (!assignment.enabled) {
      return barberIds.filter((barberId) => barberId !== assignment.assigneeId);
    }

    // add barbersId to assignment if enabled
    if (assignment.assigneeId && !barberIds.includes(assignment.assigneeId)) {
      barberIds.push(assignment.assigneeId);
    }

    return barberIds;
  };

  const toggleBarberAssignment = async (
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => {
    const targetShop = shops.find((shopItem) => shopItem.id === assignment.shopId);

    if (!targetShop || !serviceId) {
      return;
    }

    const targetAssignment = service?.assignments?.find(
      (assignment) => assignment.assigneeId === targetShop.id,
    );

    if (targetAssignment) {
      await callTheApi(assignment.assignmentId, () =>
        assign(
          serviceId,
          assignment,
          getUpdatedBarberIdsList(targetShop, assignment, targetAssignment),
          targetShop.id,
        ),
      );

      return;
    }

    const targetShopAssignment = service?.assignments?.find(
      (shopAssignment) => shopAssignment.assignmentId === assignment.parentId,
    );

    if (!targetShopAssignment) {
      // if targetAssignment undefined - we trying to enable barber assignment of disabled shop assignment
      // so for this case we should call saveAssignment, then call assign with only target barberId
      await callTheApi(assignment.assignmentId, () =>
        toggleShopAssignment(
          {
            ...assignment,
            assigneeId: targetShop.id,
            assignmentType: 'shop',
          },
          assignment.assigneeId!,
        ),
      );
    }
  };

  const toggleAssignment = async (assignment: AssignmentWithNamePhotosMinutesShop) => {
    if (!assignment.assignmentId) {
      return;
    }

    switch (assignment.assignmentType) {
      case USER_KIND_BARBER:
        return toggleBarberAssignment(assignment);
      case USER_KIND_SHOP:
        return toggleShopAssignment(assignment);
      default:
        return;
    }
  };

  const changeAssignmentField = async (
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => {
    if (!service?.id) {
      return;
    }

    if (!assignment.assignmentId && !assignment.assignmentId) {
      return;
    }

    await callTheApi(assignment.assignmentId, () =>
      saveAssignment(service.id, {
        ...assignment,
        enabled: assignment.visibility,
      }),
    );
  };

  return {
    changeAssignmentField,
    loadingAssignments,
    toggleAssignment,
  };
};
