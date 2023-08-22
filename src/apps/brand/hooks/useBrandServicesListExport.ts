import { useApiMutation } from '@getsquire/handyman/api';

import { BrandId, UseServicesListExportResult } from '@app/interfaces';
import { BrandServiceApiService } from '@app/api';

export interface UseBrandServicesListExportPayload extends BrandId {
  userName?: string;
}

export const useBrandServicesListExport = (
  payload: UseBrandServicesListExportPayload,
): UseServicesListExportResult => {
  const { brandId, userName } = payload;

  const servicesLiseExport = useApiMutation({
    endpoint: BrandServiceApiService.brandServicesExport,
  });

  const exportToCsv = () =>
    servicesLiseExport.mutateAsync({
      brandId,
      userName,
    });

  const loading = servicesLiseExport.isLoading;

  return {
    exportToCsv,
    loading,
  };
};
