import { useState } from 'react';

import { UseServiceAssignmentActionResult } from '@app/interfaces';
import { USER_KIND_BARBER } from '@app/constants';
import { AssignmentWithNamePhotosMinutesShop, LoadingAssignments } from '@app/interfaces';
import {
  useServiceApp,
  useServiceAssignmentMutation,
  useServiceQuery,
  useBarbersListQuery,
} from '@app/hooks';

import { useShopServiceAssignmentUpdate } from './useShopServiceAssignmentUpdate';

export const useShopServiceAssignmentAction = (
  serviceId: string | undefined,
): UseServiceAssignmentActionResult => {
  const { shop } = useServiceApp();
  const [loadingAssignments, setLoadingAssignments] = useState<LoadingAssignments>({});

  const { data: service } = useServiceQuery(serviceId);
  const { data: barbers } = useBarbersListQuery();

  const { assign, saveAssignment } = useServiceAssignmentMutation();
  const { mutate } = useShopServiceAssignmentUpdate({
    shopId: shop!.id,
  });

  const setLoading = (loading: boolean, assignmentId: string) => {
    setLoadingAssignments((prevLoading) => ({ ...prevLoading, [assignmentId]: loading }));
  };

  const callTheApi = async (assignmentLoadingId: string, call: Function) => {
    setLoading(true, assignmentLoadingId);
    await call();
    setLoading(false, assignmentLoadingId);
  };

  const toggleBarberAssignment = async (
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => {
    if (!service?.id) {
      return;
    }

    let barberIds = barbers
      ?.map((barberItem) => barberItem.id)
      .filter((barberId) =>
        service?.assignments?.find(
          (serviceAssignment) => serviceAssignment.assigneeId === barberId,
        ),
      );

    // remove barbersId from assignment if disabled
    if (!assignment.enabled) {
      barberIds = barberIds?.filter((barberId) => barberId !== assignment.assigneeId);
      // add barbersId to assignment if enabled
    } else {
      if (assignment.assigneeId && !barberIds?.includes(assignment.assigneeId)) {
        barberIds?.push(assignment.assigneeId);
      }
    }

    await callTheApi(assignment.assignmentId, () =>
      assign(service.id, assignment, barberIds ?? [], ''),
    );
  };

  const toggleAssignment = async (assignment: AssignmentWithNamePhotosMinutesShop) => {
    if (!assignment.parentId) {
      return;
    }

    if (!assignment.assignmentId && !assignment.assignmentId) {
      return;
    }

    // this is a barber assignment
    if (assignment.assignmentType === USER_KIND_BARBER) {
      await toggleBarberAssignment(assignment);
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

    if (assignment.assignmentType === 'shop') {
      await callTheApi(assignment.assignmentId, () =>
        mutate(service, {
          ...assignment,
          enabled: assignment.visibility,
        }),
      );

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
