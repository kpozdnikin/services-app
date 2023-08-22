import { useApiMutation } from '@getsquire/handyman/api';

import { WithoutId } from '@app/types';
import {
  BrandId,
  UseServiceUpdateResult,
  SingleService,
  SingleServiceDTO,
} from '@app/interfaces';
import { BrandServiceApiService } from '@app/api';
import { mapServiceFromClientToDTO } from '@app/utils';

export const useBrandServiceUpdate = (payload: BrandId): UseServiceUpdateResult => {
  const { brandId } = payload;

  const updateService = useApiMutation({
    endpoint: BrandServiceApiService.brandServiceUpdate,
  });

  const mutate = (service: WithoutId<SingleService>) => {
    return updateService.mutateAsync({
      service: mapServiceFromClientToDTO(service) as SingleServiceDTO,
      brandId,
    });
  };

  return {
    isLoading: updateService.isLoading,
    mutate,
  };
};
