import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum, RumErrorEvent } from '@datadog/browser-rum';

import { config } from '@app/config';

export const initDatadog = () => {
  if (['local', 'test'].includes(config.deploymentEnv)) {
    return;
  }

  const configSampleRate = Number(config.datadog.sampleRate);
  const sampleRate = Number.isNaN(configSampleRate) ? 100 : configSampleRate;

  const mutualOptions = {
    clientToken: config.datadog.clientToken,
    service: config.datadog.service,
    version: config.version,
    env: config.deploymentEnv,
    site: 'datadoghq.com',
    sampleRate,
  };

  datadogLogs.init({
    ...mutualOptions,
    silentMultipleInit: true,
  });

  datadogRum.init({
    ...mutualOptions,
    applicationId: config.datadog.appId,
    trackInteractions: true,
    trackViewsManually: true,
    beforeSend: (event) => {
      const errorStack = (event.error as RumErrorEvent)?.stack;
      // Filtering out other URLS. If error logging will be required on another domain, check DEPLOYMENT_URL env var
      const errorFromAnotherDomain =
        event.type === 'error' && !(errorStack as string)?.includes(config.deploymentUrl);

      const hasUserNavigatedAway = event.view.name === 'outside';

      return !(errorFromAnotherDomain || hasUserNavigatedAway);
    },
  });
};
