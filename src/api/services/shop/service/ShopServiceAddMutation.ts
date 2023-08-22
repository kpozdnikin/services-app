import { QueryClient } from 'react-query';

import { WithoutId } from '@app/types';
import { AuthenticatedEndpointMutation, ShopServiceApiService } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { config } from '@app/config';

export type ShopServiceAdd = {
  service: WithoutId<SingleServiceDTO>;
  shopId: string;
};

export class ShopServiceAddMutation extends AuthenticatedEndpointMutation<
  WithoutId<SingleServiceDTO>,
  ShopServiceAdd
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: ShopServiceAdd): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.post<SingleServiceDTO, WithoutId<SingleServiceDTO>>(
      `/shop/${payload.shopId}/service`,
      payload.service,
      {
        headers,
      },
    );
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: WithoutId<SingleServiceDTO> | undefined,
    payload: ShopServiceAdd,
  ) {
    const queryKey = ShopServiceApiService.shopServicesQuery.getKey({
      shopId: payload.shopId,
    });

    queryClient.invalidateQueries(queryKey, { refetchInactive: true });
  }
}
