import { QueryKey } from 'react-query';

import { CategoryDTO } from '@app/interfaces';
import { config } from '@app/config';
import { hashKey } from '@app/api/utils';
import { AuthenticatedEndpointQuery } from '@app/api';

import { defaultLimitSkipSuffix } from '../../utils';

type RequestArgs = {
  brandId: string;
  limit: number;
  skip: number;
};

export class BrandServiceCategoriesQuery extends AuthenticatedEndpointQuery<
  CategoryDTO[],
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ brandId, ...payload }: RequestArgs): QueryKey {
    return ['brand', brandId, 'services', 'categories', 'list', hashKey(payload)];
  }

  async request({ brandId, limit, skip }: RequestArgs): Promise<CategoryDTO[]> {
    const headers = this.buildHeaders();

    return this.http.get<CategoryDTO[]>(
      `/brand/${brandId}/service-category?${defaultLimitSkipSuffix(limit, skip)}`,
      {
        headers,
      },
    );
  }
}
