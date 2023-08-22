import { AssignmentWithNamePhotosMinutesShop, Service } from '@app/interfaces';

export const mergeShopServiceWithAssignment = (
  previousService: Service | undefined,
  newAssignment: AssignmentWithNamePhotosMinutesShop,
): Service => {
  if (newAssignment.assignmentType === 'shop') {
    return {
      ...previousService!,
      enabled: !!newAssignment.visibility,
      cost: newAssignment.cost!,
      duration: newAssignment.duration!,
      kioskEnabled: newAssignment.kioskEnabled!,
      requiresPrepaid: !!newAssignment.requiresPrepaid,
    };
  }

  return {
    ...previousService!,
    assignments: previousService?.assignments?.map((assignment) => {
      if (assignment.assignmentId === newAssignment.assignmentId) {
        return newAssignment;
      }

      return assignment;
    }),
  };
};

export const mergeShopServiceBarbersAssignments = (
  previousService: Service | undefined,
  newAssignment: AssignmentWithNamePhotosMinutesShop,
) => {
  // find assignment with the same id in the service
  const targetAssignment = previousService?.assignments?.find(
    (prevAssignment) => prevAssignment.assignmentId === newAssignment.assignmentId,
  );

  if (!targetAssignment && newAssignment.assignmentType === 'barber') {
    return {
      ...previousService!,
      assignments: [...(previousService?.assignments ?? []), newAssignment],
    };
  }

  return {
    ...previousService!,
    assignments: previousService!.assignments!.filter(
      (assignment) => assignment.assignmentId !== newAssignment.assignmentId,
    ),
  };
};
