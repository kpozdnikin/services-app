import { QueryKey } from 'react-query';

import { Category, CategoryDTO } from '@app/interfaces';
import { config } from '@app/config';
import { AuthenticatedEndpointQuery } from '@app/api';

type RequestArgs = {
  brandId: string;
  categoryId: string;
};

export class BrandServiceCategoryQuery extends AuthenticatedEndpointQuery<
  Category,
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
  }

  getKey({ brandId, categoryId }: RequestArgs): QueryKey {
    return ['brand', brandId, 'services', 'category', categoryId];
  }

  async request({ brandId, categoryId }: RequestArgs): Promise<Category> {
    const headers = this.buildHeaders();

    const response = await this.http.get<CategoryDTO>(
      `/brand/${brandId}/service-category/${categoryId}`,
      {
        headers,
      },
    );

    return this.buildClientModel(response);
  }

  buildClientModel(categoryData: CategoryDTO): Category {
    if (!categoryData) {
      throw new Error('You have no permissions to to that');
    }

    return {
      id: categoryData.id,
      name: categoryData.name,
    };
  }
}
