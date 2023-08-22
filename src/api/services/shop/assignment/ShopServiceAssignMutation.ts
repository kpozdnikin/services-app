import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, ShopServiceApiService } from '@app/api';
import { config } from '@app/config';
import { AssignmentWithNamePhotosMinutesShop, Service } from '@app/interfaces';
import { mergeShopServiceBarbersAssignments } from '@app/api/services/shop/shopLevelMergeHelpers';

export type BarbersList = {
  barbers: string[];
};

export interface ShopServiceAssignPayload extends BarbersList {
  assignment: AssignmentWithNamePhotosMinutesShop;
  shopId: string;
  serviceId: string;
}

export class ShopServiceAssignMutation extends AuthenticatedEndpointMutation<
  BarbersList,
  ShopServiceAssignPayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceAssignPayload): Promise<BarbersList> {
    const headers = this.buildHeaders();

    return this.http.post<BarbersList, BarbersList>(
      `/shop/${payload.shopId}/service/${payload.serviceId}/assign`,
      {
        barbers: payload.barbers,
      },
      {
        headers,
      },
    );
  }

  async afterMutationStart(queryClient: QueryClient, payload: ShopServiceAssignPayload) {
    const { assignment: newAssignment, shopId, serviceId } = payload;

    const serviceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId,
      serviceId,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeShopServiceBarbersAssignments(previousService, newAssignment),
    );

    return { previousService };
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: BarbersList | undefined,
    payload: ShopServiceAssignPayload,
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
