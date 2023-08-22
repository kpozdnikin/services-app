import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, BrandServiceCategoryApiService } from '@app/api';
import { Category } from '@app/interfaces';
import { config } from '@app/config';

export type BrandServiceCategoryDelete = {
  brandId: string;
  categoryId: string;
};

export class BrandServiceCategoryDeleteMutation extends AuthenticatedEndpointMutation<
  Category,
  BrandServiceCategoryDelete
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceCategoryDelete): Promise<Category> {
    const headers = this.buildHeaders();

    return this.http.delete<Category, undefined>(
      `/brand/${payload.brandId}/service-category/${payload.categoryId}`,
      undefined,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Category | undefined,
    payload: BrandServiceCategoryDelete,
  ) {
    const queryKey = BrandServiceCategoryApiService.brandServiceCategories.getKey({
      brandId: payload.brandId,
      limit: config.defaultServiceCategoriesLimit,
      skip: config.defaultServiceCategoriesSkip,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
