export const config = {
  version: process.env.VERSION as string,
  appRootId: process.env.PUBLIC_APP_ROOT_ID as string,
  apiUrl: process.env.PUBLIC_API_URL as string,
  dates: {
    timeFormat: 'h:mma', // 9:30AM
    shortDateFormat: 'LLL do', // Sep 16th
    fullDateFormat: 'iii, LLL do', // Sun, Sep 1
  },
  datadog: {
    clientToken: process.env.PUBLIC_DATADOG_TOKEN as string,
    appId: process.env.PUBLIC_DATADOG_APP_ID as string,
    service: process.env.PUBLIC_DATADOG_SERVICE as string,
    sampleRate: process.env.PUBLIC_DATADOG_SAMPLE_RATE,
  },
  deploymentEnv: process.env.PUBLIC_DEPLOYMENT_ENV as string,
  deploymentUrl: process.env.PUBLIC_DEPLOYMENT_URL as string,
  tokensUrl: process.env.PUBLIC_TOKENS_API_URL as string,
  defaultServiceCategoriesLimit: 50,
  defaultServiceCategoriesSkip: 0,
  showLocalHeader: process.env.PUBLIC_SHOW_LOCAL_HEADER,
};
