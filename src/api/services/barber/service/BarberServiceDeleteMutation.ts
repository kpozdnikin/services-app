import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation } from '@app/api';
import { Service } from '@app/interfaces';
import { config } from '@app/config';

import { BarberServiceApiService } from './BarberServiceApiService';

export type BarberServiceDelete = {
  barberId: string;
  shopId: string;
  serviceId: string;
};

export class BarberServiceDeleteMutation extends AuthenticatedEndpointMutation<
  Service,
  BarberServiceDelete
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BarberServiceDelete): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.delete<Service, undefined>(
      `/shop/${payload.shopId}/barber/${payload.barberId}/service/${payload.serviceId}`,
      undefined,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Service | undefined,
    payload: BarberServiceDelete,
  ) {
    const queryKey = BarberServiceApiService.barberServicesQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
