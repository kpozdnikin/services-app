import { QueryClient } from 'react-query';
import { downloadFromBlob } from '@getsquire/handyman/api';

import { AuthenticatedEndpointMutation } from '@app/api';
import { config } from '@app/config';
import { defaultServicesExportSuffix } from '@app/api/services/utils';

type RequestArgs = {
  brandId: string;
  userName?: string;
};

export class BrandServicesExport extends AuthenticatedEndpointMutation<
  Blob,
  RequestArgs
> {
  constructor() {
    super();

    this.baseUrl = `${config.apiUrl}/v2`;
    this.request = this.request.bind(this);
  }

  async request({ brandId }: RequestArgs): Promise<Blob> {
    const headers = this.buildHeaders();
    return this.http.getRaw(`/brand/${brandId}/service?${defaultServicesExportSuffix}`, {
      headers,
    });
  }

  afterMutationSuccess(queryClient: QueryClient, data: Blob, payload: RequestArgs) {
    downloadFromBlob(data, `services_${payload.userName}.csv`);
  }
}
