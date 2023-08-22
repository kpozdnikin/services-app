import { QueryClient } from 'react-query';

import {
  AuthenticatedEndpointMutation,
  mergeServiceWithAssignment,
  ShopServiceApiService,
} from '@app/api';
import {
  AssignmentBase,
  AssignmentWithNamePhotosMinutesShop,
  Service,
} from '@app/interfaces';
import { config } from '@app/config';

export type ShopServiceAssignmentSavePayload = {
  assignment: AssignmentWithNamePhotosMinutesShop;
  shopId: string;
  serviceId: string;
};

export class ShopServiceAssignmentSaveMutation extends AuthenticatedEndpointMutation<
  AssignmentBase,
  ShopServiceAssignmentSavePayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceAssignmentSavePayload): Promise<AssignmentBase> {
    const headers = this.buildHeaders();

    return this.http.post<AssignmentBase, AssignmentBase>(
      `/shop/${payload.shopId}/service/${payload.serviceId}/save-assignment`,
      payload.assignment,
      {
        headers,
      },
    );
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: ShopServiceAssignmentSavePayload,
  ) {
    const { assignment: newAssignment, shopId, serviceId } = payload;

    const serviceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId,
      serviceId,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeServiceWithAssignment(previousService, newAssignment),
    );

    return { previousService };
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: AssignmentBase | undefined,
    payload: ShopServiceAssignmentSavePayload,
  ) {
    const queryServicesKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    const queryServiceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId: payload.shopId,
      serviceId: payload.serviceId,
    });

    queryClient.invalidateQueries(queryServicesKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryServiceKey, { refetchInactive: true });
  }
}
