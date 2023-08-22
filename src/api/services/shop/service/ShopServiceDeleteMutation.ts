import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, ShopServiceApiService } from '@app/api';
import { Service } from '@app/interfaces';
import { config } from '@app/config';

export type ShopServiceDelete = {
  shopId: string;
  serviceId: string;
};

export class ShopServiceDeleteMutation extends AuthenticatedEndpointMutation<
  Service,
  ShopServiceDelete
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceDelete): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.delete<Service, undefined>(
      `/shop/${payload.shopId}/service/${payload.serviceId}`,
      undefined,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Service | undefined,
    payload: ShopServiceDelete,
  ) {
    const queryKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
