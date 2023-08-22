import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation } from '@app/api';
import { Service } from '@app/interfaces';
import { config } from '@app/config';

import { BrandServiceApiService } from './BrandServiceApiService';

export type BrandServiceDelete = {
  brandId: string;
  serviceId: string;
};

export class BrandServiceDeleteMutation extends AuthenticatedEndpointMutation<
  Service,
  BrandServiceDelete
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceDelete): Promise<Service> {
    const headers = this.buildHeaders();

    return this.http.delete<Service, undefined>(
      `/brand/${payload.brandId}/service/${payload.serviceId}`,
      undefined,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: Service | undefined,
    payload: BrandServiceDelete,
  ) {
    const queryKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
