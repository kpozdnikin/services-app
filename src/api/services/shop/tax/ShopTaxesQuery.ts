import { QueryKey } from 'react-query';

import { TaxBase } from '@app/types';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  shopId: string;
};

export class ShopTaxesQuery extends AuthenticatedEndpointQuery<TaxBase[], RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v1`;
  }

  getKey({ shopId }: RequestArgs): QueryKey {
    return ['shop', shopId, 'taxes', 'list'];
  }

  async request({ shopId }: RequestArgs): Promise<TaxBase[]> {
    const headers = this.buildHeaders();

    return this.http.get<TaxBase[]>(`/shop/${shopId}/tax`, {
      headers,
    });
  }
}
