import { QueryClient } from 'react-query';
import { HttpError } from '@getsquire/handyman/api';

import { AuthenticatedEndpointMutation } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { config } from '@app/config';

import { BrandServiceApiService } from './BrandServiceApiService';

export type BrandServiceUpdate = {
  brandId: string;
  service: SingleServiceDTO;
};

export class BrandServiceUpdateMutation extends AuthenticatedEndpointMutation<
  SingleServiceDTO,
  BrandServiceUpdate
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceUpdate): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.put<SingleServiceDTO, SingleServiceDTO>(
      `/brand/${payload.brandId}/service/${payload.service.id}`,
      payload.service,
      {
        headers,
      },
    );
  }

  async afterMutationStart(queryClient: QueryClient, payload: BrandServiceUpdate) {
    const { service } = payload;

    const serviceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId: payload.brandId,
      serviceId: payload.service.id,
    });

    const previousData = queryClient.getQueryData(serviceKey);
    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<SingleServiceDTO>(serviceKey, (previousService) => ({
      ...previousService,
      ...service,
      taxes: service.tax,
    }));

    return previousData;
  }

  async afterMutationError(
    queryClient: QueryClient,
    error: HttpError,
    payload: BrandServiceUpdate,
    context: SingleServiceDTO,
  ) {
    const serviceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId: payload.brandId,
      serviceId: payload.service.id,
    });

    queryClient.setQueryData(serviceKey, context);
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: SingleServiceDTO | undefined,
    payload: BrandServiceUpdate,
  ) {
    const queryServicesKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    const queryServiceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId: payload.brandId,
      serviceId: payload.service.id,
    });

    queryClient.invalidateQueries(queryServicesKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryServiceKey, { refetchInactive: true });
  }
}
