import { QueryClient } from 'react-query';
import { HttpError } from '@getsquire/handyman/api/transport/types';
import { Nullable } from '@getsquire/handyman/types/Nullable';

import { AuthenticatedEndpointMutation } from '@app/api';
import {
  AssignmentBase,
  AssignmentWithNamePhotosMinutesShop,
  Service,
} from '@app/interfaces';
import { config } from '@app/config';

import { BrandServiceApiService } from '../service/BrandServiceApiService';
import { mergeServiceWithAssignment } from '../brandLevelMergeHelpers';

export type BrandServiceAssignmentSavePayload = {
  assignment: AssignmentWithNamePhotosMinutesShop;
  brandId: string;
  serviceId: string;
};

export class BrandServiceAssignmentSaveMutation extends AuthenticatedEndpointMutation<
  AssignmentBase,
  BrandServiceAssignmentSavePayload
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  request(payload: BrandServiceAssignmentSavePayload): Promise<AssignmentBase> {
    const headers = this.buildHeaders();

    return this.http.post<AssignmentBase, AssignmentWithNamePhotosMinutesShop>(
      `/brand/${payload.brandId}/service/${payload.serviceId}/save-assignment`,
      payload.assignment,
      {
        headers,
      },
    );
  }

  async afterMutationStart(
    queryClient: QueryClient,
    payload: BrandServiceAssignmentSavePayload,
  ) {
    const { assignment: newAssignment, brandId, serviceId } = payload;

    const serviceKey = BrandServiceApiService.brandServiceQuery.getKey({
      brandId,
      serviceId,
    });

    const previousService = queryClient.getQueryData(serviceKey);

    await queryClient.cancelQueries(serviceKey);

    queryClient.setQueryData<Service>(serviceKey, (previousService) =>
      mergeServiceWithAssignment(previousService, newAssignment),
    );

    return { previousService };
  }

  afterMutationError(
    queryClient: QueryClient,
    error: HttpError,
    payload: BrandServiceAssignmentSavePayload,
    context: { previousService: Service },
  ) {
    return context.previousService;
  }

  afterMutationSettled(
    queryClient: QueryClient,
    data: AssignmentBase | undefined,
    error: Nullable<HttpError>,
    payload: BrandServiceAssignmentSavePayload,
    context: unknown,
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
