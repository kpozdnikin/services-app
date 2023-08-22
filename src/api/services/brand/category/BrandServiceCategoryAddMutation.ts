import { QueryClient } from 'react-query';

import { WithoutId } from '@app/types';
import { AuthenticatedEndpointMutation, BrandServiceCategoryApiService } from '@app/api';
import { Category } from '@app/interfaces';
import { config } from '@app/config';

export type BrandServiceCategoryAdd = {
  category: WithoutId<Category>;
  brandId: string;
};

export class BrandServiceCategoryAddMutation extends AuthenticatedEndpointMutation<
  WithoutId<Category>,
  BrandServiceCategoryAdd
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceCategoryAdd): Promise<Category> {
    const headers = this.buildHeaders();

    return this.http.post<Category, WithoutId<Category>>(
      `/brand/${payload.brandId}/service-category`,
      payload.category,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: WithoutId<Category> | undefined,
    payload: BrandServiceCategoryAdd,
  ) {
    const queryKey = BrandServiceCategoryApiService.brandServiceCategories.getKey({
      brandId: payload.brandId,
      limit: config.defaultServiceCategoriesLimit,
      skip: config.defaultServiceCategoriesSkip,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
