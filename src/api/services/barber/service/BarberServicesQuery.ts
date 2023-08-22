import { QueryKey } from 'react-query';

import { Service } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultServicesQuerySuffix } from '../../utils';

type RequestArgs = {
  barberId: string;
  shopId: string;
};

export class BarberServicesQuery extends AuthenticatedEndpointQuery<
  Service[],
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ barberId, shopId }: RequestArgs): QueryKey {
    return ['barber', 'services', 'list', barberId, shopId];
  }

  async request(
    { barberId, shopId }: RequestArgs,
    signal: AbortSignal,
  ): Promise<Service[]> {
    const headers = this.buildHeaders();

    return this.http.get<Service[]>(
      `/shop/${shopId}/barber/${barberId}/service?${defaultServicesQuerySuffix}`,
      {
        headers,
        signal,
      },
    );
  }
}
