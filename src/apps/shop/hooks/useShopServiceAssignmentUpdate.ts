import { useApiMutation } from '@getsquire/handyman/api';

import { ShopServiceAssignmentApiService } from '@app/api';
import {
  AssignmentWithNamePhotosMinutesShop,
  Service,
  ShopId,
  UseServiceMutationResultBase,
} from '@app/interfaces';

interface UseServiceAssignmentUpdateResult extends UseServiceMutationResultBase {
  mutate: (
    service: Service,
    assignment: AssignmentWithNamePhotosMinutesShop,
  ) => Promise<void>;
}

export const useShopServiceAssignmentUpdate = (
  payload: ShopId,
): UseServiceAssignmentUpdateResult => {
  const { shopId } = payload;

  const updateServiceAssignment = useApiMutation({
    endpoint: ShopServiceAssignmentApiService.shopServiceAssignmentUpdate,
  });

  const mutate = (service: Service, assignment: AssignmentWithNamePhotosMinutesShop) => {
    return updateServiceAssignment.mutateAsync({
      shopId,
      service,
      assignment,
    });
  };

  return {
    isLoading: updateServiceAssignment.isLoading,
    mutate,
  };
};
