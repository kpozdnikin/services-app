import { QueryClient } from 'react-query';
import { HttpError } from '@getsquire/handyman/api';

import { AuthenticatedEndpointMutation } from '@app/api';
import { Service, ServiceOrder } from '@app/interfaces';
import { config } from '@app/config';

import { BrandServiceApiService } from './BrandServiceApiService';

export type UpdateBrandServiceOrder = {
  services: Service[];
  brandId: string;
};

export class BrandServicesOrderMutation extends AuthenticatedEndpointMutation<
  ServiceOrder[],
  UpdateBrandServiceOrder
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: UpdateBrandServiceOrder): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.put<Service[], ServiceOrder[]>(
      `/brand/${payload.brandId}/service/order`,
      payload.services.map((service: Service) => ({
        id: service.id,
        order: service.order,
      })),
      {
        headers,
      },
    );
  }

  async afterMutationError(
    queryClient: QueryClient,
    error: HttpError,
    payload: UpdateBrandServiceOrder,
    context: unknown,
  ) {
    const queryKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    queryClient.setQueryData(queryKey, context);
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: UpdateBrandServiceOrder,
  ): Promise<ServiceOrder[]> {
    const queryKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
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
    payload: UpdateBrandServiceOrder,
  ) {
    const queryKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
