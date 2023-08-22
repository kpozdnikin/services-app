import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, BrandServiceCategoryApiService } from '@app/api';
import { Category } from '@app/interfaces';
import { config } from '@app/config';

export type BrandServiceCategoryUpdate = {
  brandId: string;
  category: Category;
};

export class BrandServiceCategoryUpdateMutation extends AuthenticatedEndpointMutation<
  Category,
  BrandServiceCategoryUpdate
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceCategoryUpdate): Promise<Category> {
    const headers = this.buildHeaders();

    return this.http.put<Category, Category>(
      `/brand/${payload.brandId}/service-category/${payload.category.id}`,
      payload.category,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Category | undefined,
    payload: BrandServiceCategoryUpdate,
  ) {
    const queryKey = BrandServiceCategoryApiService.brandServiceCategories.getKey({
      brandId: payload.brandId,
      limit: config.defaultServiceCategoriesLimit,
      skip: config.defaultServiceCategoriesSkip,
    });

    const queryKeySingle = BrandServiceCategoryApiService.brandServiceCategory.getKey({
      brandId: payload.brandId,
      categoryId: payload.category.id,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryKeySingle, { refetchInactive: true });
  }
}
