import { useApiMutation } from '@getsquire/handyman/api';

import { mapServiceFromClientToDTO } from '@app/utils';
import { BrandServiceApiService } from '@app/api';
import { WithoutId } from '@app/types';
import { BrandId, UseServiceAddResult, SingleService } from '@app/interfaces';

export const useBrandServiceAdd = (payload: BrandId): UseServiceAddResult => {
  const { brandId } = payload;

  const addService = useApiMutation({
    endpoint: BrandServiceApiService.brandServiceAdd,
  });

  const mutate = (service: WithoutId<SingleService>) => {
    return addService.mutateAsync({
      service: mapServiceFromClientToDTO(service),
      brandId,
    });
  };

  return {
    isLoading: addService.isLoading,
    mutate,
  };
};
