import { FC, createContext, ReactNode } from 'react';

import { Nullable } from '@app/types';
import { ServiceApp } from '@app/interfaces';

export const ServicesApiContext = createContext<Nullable<ServiceApp>>(null);

interface ServicesApiContextProviderProps {
  config: ServiceApp;
  children: ReactNode;
}

export const ServicesApiContextProvider: FC<ServicesApiContextProviderProps> = (
  props,
) => {
  const { config, children } = props;

  return (
    <ServicesApiContext.Provider value={config as ServiceApp}>
      {children}
    </ServicesApiContext.Provider>
  );
};
