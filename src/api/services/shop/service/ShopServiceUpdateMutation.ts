import { QueryClient } from 'react-query';
import { HttpError } from '@getsquire/handyman/api';

import { AuthenticatedEndpointMutation, ShopServiceApiService } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { config } from '@app/config';

export type ShopServiceUpdate = {
  shopId: string;
  service: SingleServiceDTO;
};

export class ShopServiceUpdateMutation extends AuthenticatedEndpointMutation<
  SingleServiceDTO,
  ShopServiceUpdate
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceUpdate): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.put<SingleServiceDTO, SingleServiceDTO>(
      `/shop/${payload.shopId}/service/${payload.service.id}`,
      payload.service,
      {
        headers,
      },
    );
  }

  async afterMutationStart(queryClient: QueryClient, payload: ShopServiceUpdate) {
    const { service } = payload;

    const serviceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId: payload.shopId,
      serviceId: payload.service.id,
    });

    const previousData = queryClient.getQueryData(serviceKey);
    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<SingleServiceDTO>(serviceKey, (previousService) => ({
      ...previousService,
      ...service,
      taxes: service.tax,
    }));

    return previousData;
  }

  async afterMutationError(
    queryClient: QueryClient,
    error: HttpError,
    payload: ShopServiceUpdate,
    context: SingleServiceDTO,
  ) {
    const serviceKey = ShopServiceApiService.shopServiceQuery.getKey({
      shopId: payload.shopId,
      serviceId: payload.service.id,
    });

    queryClient.setQueryData(serviceKey, context);
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: SingleServiceDTO | undefined,
    payload: ShopServiceUpdate,
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
