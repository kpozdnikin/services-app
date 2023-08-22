import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultServicesQuerySuffix } from '../../utils';

type RequestArgs = {
  brandId: string;
};

export class BrandServicesQuery extends AuthenticatedEndpointQuery<
  Service[],
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ brandId }: RequestArgs): QueryKey {
    return ['brand', brandId, 'services', 'list'];
  }

  async request({ brandId }: RequestArgs, signal: AbortSignal): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.get<Service[]>(
      `/brand/${brandId}/service?${defaultServicesQuerySuffix}`,
      {
        headers,
        signal,
      },
    );
  }
}
