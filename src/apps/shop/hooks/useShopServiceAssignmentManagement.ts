import { useApiMutation } from '@getsquire/handyman/api';

import {
  UseServiceAssignmentMutationResult,
  ShopId,
  AssignmentWithNamePhotosMinutesShop,
} from '@app/interfaces';
import { ShopServiceAssignmentApiService } from '@app/api';

export const useShopServiceAssignmentManagement = (
  payload: ShopId,
): UseServiceAssignmentMutationResult => {
  const shopServiceAssign = useApiMutation({
    endpoint: ShopServiceAssignmentApiService.shopServiceAssign,
  });

  const shopServiceAssignmentSave = useApiMutation({
    endpoint: ShopServiceAssignmentApiService.shopServiceAssignmentSave,
  });

  const assign = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
    barberIds: string[],
  ) =>
    shopServiceAssign.mutateAsync({
      serviceId,
      assignment,
      shopId: payload.shopId,
      barbers: barberIds,
    });

  const saveAssignment = async (
    serviceId: string,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) =>
    shopServiceAssignmentSave.mutateAsync({
      assignment,
      shopId: payload.shopId,
      serviceId,
    });

  return {
    assign,
    saveAssignment,
  };
};
