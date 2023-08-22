import { QueryClient } from 'react-query';

import { WithoutId } from '@app/types';
import { AuthenticatedEndpointMutation } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { config } from '@app/config';

import { BrandServiceApiService } from './BrandServiceApiService';

export type BrandServiceAdd = {
  service: WithoutId<SingleServiceDTO>;
  brandId: string;
};

export class BrandServiceAddMutation extends AuthenticatedEndpointMutation<
  WithoutId<SingleServiceDTO>,
  BrandServiceAdd
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceAdd): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.post<SingleServiceDTO, WithoutId<SingleServiceDTO>>(
      `/brand/${payload.brandId}/service`,
      payload.service,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: WithoutId<SingleServiceDTO> | undefined,
    payload: BrandServiceAdd,
  ) {
    const queryKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
