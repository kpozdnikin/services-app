import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultServicesQuerySuffix } from '../../utils';

type RequestArgs = {
  shopId: string;
};

export class ShopServicesQuery extends AuthenticatedEndpointQuery<
  Service[],
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ shopId }: RequestArgs): QueryKey {
    return ['shop', 'services', 'list', shopId];
  }

  async request({ shopId }: RequestArgs, signal: AbortSignal): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.get<Service[]>(
      `/shop/${shopId}/service?${defaultServicesQuerySuffix}`,
      {
        headers,
        signal,
      },
    );
  }
}
