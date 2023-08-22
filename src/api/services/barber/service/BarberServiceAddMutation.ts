import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { config } from '@app/config';

import { BarberServiceApiService } from './BarberServiceApiService';

export type BarberServiceAdd = {
  service: WithoutId<SingleServiceDTO>;
  barberId: string;
  shopId: string;
};

export class BarberServiceAddMutation extends AuthenticatedEndpointMutation<
  WithoutId<SingleServiceDTO>,
  BarberServiceAdd
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BarberServiceAdd): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.post<SingleServiceDTO, WithoutId<SingleServiceDTO>>(
      `/shop/${payload.shopId}/barber/${payload.barberId}/service`,
      payload.service,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: WithoutId<SingleServiceDTO>,
    payload: BarberServiceAdd,
  ) {
    const queryKey = BarberServiceApiService.barberServicesQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
