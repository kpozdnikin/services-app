import { useApiMutation } from '@getsquire/handyman/api';

import { UseServicesListExportResult, BarberAndShopId } from '@app/interfaces';
import { BarberServiceApiService } from '@app/api';

export interface BarberServicesListExportPayload extends BarberAndShopId {
  userName?: string;
}

export const useBarberServicesListExport = (
  payload: BarberServicesListExportPayload,
): UseServicesListExportResult => {
  const { barberId, shopId, userName } = payload;

  const servicesLiseExport = useApiMutation({
    endpoint: BarberServiceApiService.barberServicesExport,
  });

  const exportToCsv = () =>
    servicesLiseExport.mutateAsync({
      barberId,
      shopId,
      userName,
    });

  const loading = servicesLiseExport.isLoading;

  return {
    exportToCsv,
    loading,
  };
};
