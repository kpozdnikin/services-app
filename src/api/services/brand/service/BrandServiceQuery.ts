import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  brandId: string;
  serviceId: string;
};

export class BrandServiceQuery extends AuthenticatedEndpointQuery<Service, RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ brandId, serviceId }: RequestArgs): QueryKey {
    return ['brand', brandId, 'service', serviceId];
  }

  async request(
    { brandId, serviceId }: RequestArgs,
    signal: AbortSignal,
  ): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.get<Service>(`/brand/${brandId}/service/${serviceId}`, {
      headers,
      signal,
    });
  }
}
