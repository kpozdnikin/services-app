import { useApiMutation } from '@getsquire/handyman/api';

import {
  BrandId,
  UseServiceAssignmentMutationResult,
  AssignmentWithNamePhotosMinutesShop,
} from '@app/interfaces';
import { BrandServiceAssignmentApiService } from '@app/api';

export const useBrandServiceAssignmentManagement = (
  payload: BrandId,
): UseServiceAssignmentMutationResult => {
  const brandServiceAssignmentSave = useApiMutation({
    endpoint: BrandServiceAssignmentApiService.brandServiceAssignmentSave,
  });
  const brandServiceAssign = useApiMutation({
    endpoint: BrandServiceAssignmentApiService.brandServiceAssign,
  });
  const brandServiceUnAssign = useApiMutation({
    endpoint: BrandServiceAssignmentApiService.brandServiceUnAssign,
  });

  const assign = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
    barberIds: string[],
    shopId: string,
  ) =>
    brandServiceAssign.mutateAsync({
      assignment,
      brandId: payload.brandId,
      serviceId,
      shopId,
      barbers: barberIds,
    });

  const deleteAssignment = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) =>
    brandServiceUnAssign.mutateAsync({
      brandId: payload.brandId,
      serviceId,
      shopId: assignment.assigneeId!,
      assignment,
    });

  const saveAssignment = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) =>
    brandServiceAssignmentSave.mutateAsync({
      assignment,
      brandId: payload.brandId,
      serviceId,
    });

  return {
    assign,
    deleteAssignment,
    saveAssignment,
  };
};
