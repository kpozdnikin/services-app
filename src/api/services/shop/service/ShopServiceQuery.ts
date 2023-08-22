import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  shopId: string;
  serviceId: string;
};

export class ShopServiceQuery extends AuthenticatedEndpointQuery<Service, RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ serviceId, shopId }: RequestArgs): QueryKey {
    return ['shopId', shopId, 'service', serviceId];
  }

  async request(
    { shopId, serviceId }: RequestArgs,
    signal: AbortSignal,
  ): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.get<Service>(`/shop/${shopId}/service/${serviceId}`, {
      headers,
      signal,
    });
  }
}
