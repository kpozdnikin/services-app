import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  barberId: string;
  shopId: string;
  serviceId: string;
};

export class BarberServiceQuery extends AuthenticatedEndpointQuery<Service, RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ barberId, serviceId, shopId }: RequestArgs): QueryKey {
    return ['barberId', barberId, 'shopId', shopId, 'service', serviceId];
  }

  async request(
    { barberId, shopId, serviceId }: RequestArgs,
    signal: AbortSignal,
  ): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.get<Service>(
      `/shop/${shopId}/barber/${barberId}/service/${serviceId}`,
      {
        headers,
        signal,
      },
    );
  }
}
