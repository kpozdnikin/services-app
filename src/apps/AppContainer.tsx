import { datadogRum } from '@datadog/browser-rum';
import { FC, StrictMode, ReactNode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { SageConfig, SageProvider } from '@getsquire/sage/configuration';

import { Logger } from '@app/utils';
import { BasenameProvider } from '@app/contexts';
import GlobalStyles from '@app/globalStyles';
import { ErrorBoundary, ShadowDomContainer } from '@app/components';
import { LocaleProvider, YupProvider } from '@app/contexts';
import { config } from '@app/config';
import { initDatadog } from '@app/datadog';

import servicesLocale from '../../static/locales/en.json';

initDatadog();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

setLogger({
  log: Logger.Log,
  warn: Logger.Warn,
  error: console.error,
});

const sageConfig: SageConfig = {
  apiUrl: config.apiUrl,
};

interface AppContainerProps {
  children: ReactNode;
  basename?: string;
}

export const AppContainer: FC<AppContainerProps> = (props) => {
  const { basename, children } = props;

  useEffect(function cleanupQueryClient() {
    return () => queryClient.clear();
  }, []);

  useEffect(function setViewAsOutside() {
    return () => datadogRum.startView('outside');
  });

  return (
    <>
      <GlobalStyles />
      <ShadowDomContainer>
        <StrictMode>
          <LocaleProvider initialLocale={servicesLocale}>
            <ErrorBoundary>
              <BrowserRouter basename={basename}>
                <BasenameProvider basename={basename}>
                  <QueryClientProvider client={queryClient}>
                    <YupProvider>
                      <SageProvider config={sageConfig}>{children}</SageProvider>
                    </YupProvider>
                  </QueryClientProvider>
                </BasenameProvider>
              </BrowserRouter>
            </ErrorBoundary>
          </LocaleProvider>
        </StrictMode>
      </ShadowDomContainer>
    </>
  );
};
