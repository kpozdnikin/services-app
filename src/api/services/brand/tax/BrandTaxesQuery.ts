import { QueryKey } from 'react-query';

import { TaxBase } from '@app/types';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  brandId: string;
};

export class BrandTaxesQuery extends AuthenticatedEndpointQuery<TaxBase[], RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v1`;
  }

  getKey({ brandId }: RequestArgs): QueryKey {
    return ['brand', brandId, 'taxes', 'list'];
  }

  async request({ brandId }: RequestArgs): Promise<TaxBase[]> {
    const headers = this.buildHeaders();

    return this.http.get<TaxBase[]>(`/brand/${brandId}/tax`, {
      headers,
    });
  }
}
