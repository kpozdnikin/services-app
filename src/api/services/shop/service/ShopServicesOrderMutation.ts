import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, ShopServiceApiService } from '@app/api';
import { Service, ServiceOrder } from '@app/interfaces';
import { config } from '@app/config';

export type UpdateShopServiceOrder = {
  services: Service[];
  shopId: string;
};

export class ShopServicesOrderMutation extends AuthenticatedEndpointMutation<
  ServiceOrder[],
  UpdateShopServiceOrder
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: UpdateShopServiceOrder): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.put<Service[], ServiceOrder[]>(
      `/shop/${payload.shopId}/service/order`,
      payload.services.map((service: Service) => ({
        id: service.id,
        order: service.order,
      })),
      {
        headers,
      },
    );
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: UpdateShopServiceOrder,
  ): Promise<ServiceOrder[]> {
    const queryKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    const previousData = (queryClient.getQueryData(
      queryKey,
    ) as unknown) as ServiceOrder[];

    await queryClient.cancelQueries(queryKey);

    queryClient.setQueryData(queryKey, payload.services);

    return previousData;
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: ServiceOrder[] | undefined,
    payload: UpdateShopServiceOrder,
  ) {
    const queryKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
