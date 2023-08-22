import { useApiMutation } from '@getsquire/handyman/api';

import { BrandId, UseServiceDeleteResult } from '@app/interfaces';
import { BrandServiceApiService } from '@app/api';

export const useBrandServiceDelete = (payload: BrandId): UseServiceDeleteResult => {
  const { brandId } = payload;

  const deleteService = useApiMutation({
    endpoint: BrandServiceApiService.brandServiceDelete,
  });

  const mutate = async (serviceId: string) => {
    await deleteService.mutateAsync({
      brandId,
      serviceId,
    });
  };

  return {
    isLoading: deleteService.isLoading,
    mutate,
  };
};
