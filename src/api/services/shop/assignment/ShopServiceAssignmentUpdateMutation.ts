import { QueryClient } from 'react-query';

import {
  AuthenticatedEndpointMutation,
  mergeShopServiceWithAssignment,
  ShopServiceApiService,
} from '@app/api';
import { AssignmentWithNamePhotosMinutesShop, Service } from '@app/interfaces';
import { config } from '@app/config';

export type ShopServiceAssignmentUpdatePayload = {
  assignment: AssignmentWithNamePhotosMinutesShop;
  shopId: string;
  service: Service;
};

export class ShopServiceAssignmentUpdateMutation extends AuthenticatedEndpointMutation<
  Service,
  ShopServiceAssignmentUpdatePayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceAssignmentUpdatePayload): Promise<Service> {
    const headers = this.buildHeaders();

    const { service, shopId } = payload;

    return this.http.put<Service, Service>(
      `/shop/${shopId}/service/${service.id}`,
      mergeShopServiceWithAssignment(service, payload.assignment),
      {
        headers,
      },
    );
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: ShopServiceAssignmentUpdatePayload,
  ) {
    const { assignment, service, shopId } = payload;

    const serviceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId,
      serviceId: service.id,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeShopServiceWithAssignment(previousService, assignment),
    );

    return { previousService };
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Service | undefined,
    payload: ShopServiceAssignmentUpdatePayload,
  ) {
    const queryServicesKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    const queryServiceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId: payload.shopId,
      serviceId: payload.service.id,
    });

    queryClient.invalidateQueries(queryServicesKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryServiceKey, { refetchInactive: true });
  }
}
