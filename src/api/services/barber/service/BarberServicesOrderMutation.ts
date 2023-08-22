import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation } from '@app/api';
import { Service, ServiceOrder } from '@app/interfaces';
import { config } from '@app/config';

import { extendInclude } from '../../utils';
import { BarberServiceApiService } from './BarberServiceApiService';

export type UpdateBarberServiceOrder = {
  services: Service[];
  barberId: string;
  shopId: string;
};

export class BarberServicesOrderMutation extends AuthenticatedEndpointMutation<
  ServiceOrder[],
  UpdateBarberServiceOrder
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: UpdateBarberServiceOrder): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.put<Service[], ServiceOrder[]>(
      `/shop/${payload.shopId}/barber/${payload.barberId}/service/order?${extendInclude([
        'shops',
      ])}`,
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
    payload: UpdateBarberServiceOrder,
  ): Promise<ServiceOrder[]> {
    const queryKey = BarberServiceApiService.barberServicesQuery.getKey({
      barberId: payload.barberId,
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
    payload: UpdateBarberServiceOrder,
  ) {
    const queryKey = BarberServiceApiService.barberServicesQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
