import { QueryClient } from 'react-query';
import { HttpError } from '@getsquire/handyman/api';

import { AuthenticatedEndpointMutation } from '@app/api';
import { SingleServiceDTO } from '@app/interfaces';
import { config } from '@app/config';

import { BarberServiceApiService } from './BarberServiceApiService';

export type BarberServiceUpdate = {
  barberId: string;
  shopId: string;
  service: SingleServiceDTO;
};

export class BarberServiceUpdateMutation extends AuthenticatedEndpointMutation<
  SingleServiceDTO,
  BarberServiceUpdate
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BarberServiceUpdate): Promise<SingleServiceDTO> {
    const headers = this.buildHeaders();

    return this.http.put<SingleServiceDTO, SingleServiceDTO>(
      `/shop/${payload.shopId}/barber/${payload.barberId}/service/${payload.service.id}`,
      payload.service,
      {
        headers,
      },
    );
  }

  async afterMutationStart(queryClient: QueryClient, payload: BarberServiceUpdate) {
    const { service } = payload;

    const serviceKey = BarberServiceApiService.barberServiceQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
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
    payload: BarberServiceUpdate,
    context: SingleServiceDTO,
  ) {
    const serviceKey = BarberServiceApiService.barberServiceQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
      serviceId: payload.service.id,
    });

    queryClient.setQueryData(serviceKey, context);
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: SingleServiceDTO | undefined,
    payload: BarberServiceUpdate,
  ) {
    const queryServicesKey = BarberServiceApiService.barberServicesQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
    });

    const queryServiceKey = BarberServiceApiService.barberServiceQuery.getKey({
      barberId: payload.barberId,
      shopId: payload.shopId,
      serviceId: payload.service.id,
    });

    queryClient.invalidateQueries(queryServicesKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryServiceKey, { refetchInactive: true });
  }
}
