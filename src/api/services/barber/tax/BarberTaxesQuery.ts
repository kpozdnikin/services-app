import { QueryKey } from 'react-query';

import { TaxBase } from '@app/types';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  barberId: string;
  shopId: string;
};

export class BarberTaxesQuery extends AuthenticatedEndpointQuery<TaxBase[], RequestArgs> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v1`;
  }

  getKey({ barberId, shopId }: RequestArgs): QueryKey {
    return ['shop', shopId, 'barber', barberId, 'taxes'];
  }

  async request({ barberId, shopId }: RequestArgs): Promise<TaxBase[]> {
    const headers = this.buildHeaders();

    return this.http.get<TaxBase[]>(`/shop/${shopId}/barber/${barberId}/tax`, {
      headers,
    });
  }
}
