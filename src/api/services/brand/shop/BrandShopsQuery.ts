import { QueryKey } from 'react-query';

import { config } from '@app/config';
import { ShopsList } from '@app/interfaces';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultShopsQuerySuffix } from '../../utils';

type RequestArgs = {
  brandId: string;
};

export class BrandShopsQuery extends AuthenticatedEndpointQuery<ShopsList, RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v1`;
  }

  getKey({ brandId }: RequestArgs): QueryKey {
    return ['brand', 'shops', 'list', brandId];
  }

  async request({ brandId }: RequestArgs): Promise<ShopsList> {
    const headers = this.buildHeaders();

    return this.http.get<ShopsList>(
      `/brand/${brandId}/shops?${defaultShopsQuerySuffix}`,
      {
        headers,
      },
    );
  }
}
