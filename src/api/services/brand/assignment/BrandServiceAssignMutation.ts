import { QueryClient } from 'react-query';

import { AuthenticatedEndpointMutation, mergeServiceBarbersAssignments } from '@app/api';
import { config } from '@app/config';
import { AssignmentWithNamePhotosMinutesShop, Service } from '@app/interfaces';

import { BrandServiceApiService } from '../service/BrandServiceApiService';

export type BarbersList = {
  barbers: string[];
};

export interface BrandServiceAssignPayload extends BarbersList {
  assignment: AssignmentWithNamePhotosMinutesShop;
  brandId: string;
  shopId: string;
  serviceId: string;
}

export class BrandServiceAssignMutation extends AuthenticatedEndpointMutation<
  BarbersList,
  BrandServiceAssignPayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceAssignPayload): Promise<BarbersList> {
    const headers = this.buildHeaders();

    return this.http.post<BarbersList, BarbersList>(
      `/shop/${payload.shopId}/service/${payload.serviceId}/assign`,
      {
        barbers: payload.barbers,
      },
      {
        headers,
      },
    );
  }

  async afterMutationStart(queryClient: QueryClient, payload: BrandServiceAssignPayload) {
    const { assignment: newAssignment, brandId, serviceId } = payload;

    const serviceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId,
      serviceId,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeServiceBarbersAssignments(previousService, newAssignment),
    );

    return { previousService };
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: BarbersList | undefined,
    payload: BrandServiceAssignPayload,
  ) {
    const queryServicesKey = BrandServiceApiService.brandServicesQuery.getKey({
      brandId: payload.brandId,
    });

    const queryServiceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId: payload.brandId,
      serviceId: payload.serviceId,
    });

    queryClient.invalidateQueries(queryServicesKey, { refetchInactive: true });
    queryClient.invalidateQueries(queryServiceKey, { refetchInactive: true });
  }
}
