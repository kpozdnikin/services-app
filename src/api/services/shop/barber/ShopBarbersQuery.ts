import { QueryKey } from 'react-query';

import { config } from '@app/config';
import { BarberWithPhotos } from '@app/interfaces';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultBarbersQuerySuffix } from '../../utils';

type RequestArgs = {
  shopId: string;
};

export class ShopBarbersQuery extends AuthenticatedEndpointQuery<
  BarberWithPhotos[],
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v1`;
  }

  getKey({ shopId }: RequestArgs): QueryKey {
    return ['shop', shopId, 'barbers', 'list'];
  }

  async request({ shopId }: RequestArgs): Promise<BarberWithPhotos[]> {
    const headers = this.buildHeaders();

    return this.http.get<BarberWithPhotos[]>(
      `/shop/${shopId}/barber?${defaultBarbersQuerySuffix}`,
      {
        headers,
      },
    );
  }
}
