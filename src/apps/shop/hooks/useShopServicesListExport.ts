import { useApiMutation } from '@getsquire/handyman/api';

import { ShopId, UseServicesListExportResult } from '@app/interfaces';
import { ShopServiceApiService } from '@app/api';

export interface UseShopServicesListExportPayload extends ShopId {
  userName?: string;
}

export const useShopServicesListExport = (
  payload: UseShopServicesListExportPayload,
): UseServicesListExportResult => {
  const { shopId, userName } = payload;

  const servicesLiseExport = useApiMutation({
    endpoint: ShopServiceApiService.shopServicesExport,
  });

  const exportToCsv = () =>
    servicesLiseExport.mutateAsync({
      shopId,
      userName,
    });

  const loading = servicesLiseExport.isLoading;

  return {
    exportToCsv,
    loading,
  };
};
