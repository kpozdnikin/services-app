import {
  Assignment,
  AssignmentWithNamePhotosMinutesShop,
  Service,
} from '@app/interfaces';

export const mergeServiceWithAssignment = (
  previousService: Service | undefined,
  newAssignment: AssignmentWithNamePhotosMinutesShop,
): Service => {
  if (newAssignment.assignmentType === 'shop') {
    // optimistic remove assignment if enabled === false and add it if enabled === true

    // find assignment with the same id in the service
    const targetAssignment = previousService?.assignments?.find(
      (prevAssignment) => prevAssignment.assignmentId === newAssignment.assignmentId,
    );

    if (!targetAssignment) {
      return {
        ...previousService!,
        assignments: [
          ...(previousService?.assignments ?? []),
          {
            ...newAssignment,
            assignments: [],
          },
        ],
      };
    }

    return {
      ...previousService!,
      assignments: previousService?.assignments?.map((assignment) => {
        if (assignment.assignmentId === newAssignment.assignmentId) {
          return {
            ...assignment,
            ...newAssignment,
            assignments: assignment.assignments,
          };
        }

        return assignment;
      }),
    };
  }

  return {
    ...previousService!,
    assignments: previousService?.assignments?.map((assignment) => ({
      ...assignment,
      assignments: assignment.assignments?.map((childAssignment) => {
        if (childAssignment.assignmentId === newAssignment.assignmentId) {
          return {
            ...childAssignment,
            ...newAssignment,
          };
        }

        return { ...childAssignment };
      }),
    })),
  };
};

export const mergeServiceWithDeletedAssignment = (
  previousService: Service | undefined,
  newAssignment: AssignmentWithNamePhotosMinutesShop,
) => ({
  ...previousService!,
  assignments: previousService?.assignments?.filter(
    (assignment) => assignment.assignmentId !== newAssignment.assignmentId,
  ),
});

export const mergeServiceBarbersAssignments = (
  previousService: Service | undefined,
  newAssignment: AssignmentWithNamePhotosMinutesShop,
) => {
  // find assignment with the same id in the service
  const targetAssignment = previousService?.assignments?.find(
    (prevAssignment) => prevAssignment.assignmentId === newAssignment.assignmentId,
  );

  if (!targetAssignment && newAssignment.assignmentType === 'shop') {
    return {
      ...previousService!,
      assignments: [...(previousService?.assignments ?? []), newAssignment],
    };
  }

  return {
    ...previousService!,
    assignments: previousService?.assignments?.map((assignment) => {
      let newAssignments: Assignment[] = [];

      if (assignment.assignmentId === newAssignment.parentId) {
        if (newAssignment.enabled) {
          // compare by barber id === assigneeId for barber assignments
          if (
            !assignment.assignments.find(
              (childAssignment) =>
                childAssignment.assigneeId === newAssignment.assigneeId,
            )
          ) {
            newAssignments = [...assignment.assignments, newAssignment];
          }
        } else {
          newAssignments = assignment.assignments.filter(
            (childAssignment) => childAssignment.assigneeId !== newAssignment.assigneeId,
          );
        }

        return {
          ...assignment,
          assignments: newAssignments,
        };
      }

      if (assignment.assignmentId === newAssignment.assignmentId) {
        return newAssignment;
      }

      return assignment;
    }),
  };
};
