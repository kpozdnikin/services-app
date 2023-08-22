import { QueryClient } from 'react-query';

import {
  AuthenticatedEndpointMutation,
  mergeServiceWithDeletedAssignment,
} from '@app/api';
import { config } from '@app/config';
import { AssignmentWithNamePhotosMinutesShop, Service } from '@app/interfaces';

import { BrandServiceApiService } from '../service/BrandServiceApiService';

export type BrandServiceUnAssignPayload = {
  brandId: string;
  shopId: string;
  serviceId: string;
  assignment: AssignmentWithNamePhotosMinutesShop;
};

export class BrandServiceUnAssignMutation extends AuthenticatedEndpointMutation<
  undefined,
  BrandServiceUnAssignPayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceUnAssignPayload): Promise<undefined> {
    const headers = this.buildHeaders();

    return this.http.delete<undefined, BrandServiceUnAssignPayload>(
      `/shop/${payload.shopId}/service/${payload.serviceId}`,
      undefined,
      {
        headers,
      },
    );
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: BrandServiceUnAssignPayload,
  ) {
    const { assignment: newAssignment, brandId, serviceId } = payload;

    const serviceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId,
      serviceId,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeServiceWithDeletedAssignment(previousService, newAssignment),
    );

    return { previousService };
  }

  afterMutationSuccess(
    queryClient: QueryClient,
    data: undefined,
    payload: BrandServiceUnAssignPayload,
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
