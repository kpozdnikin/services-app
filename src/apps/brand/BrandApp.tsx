import { VFC } from 'react';

import { ServicesApiContextProvider } from '@app/api/servicesApi';
import { AppRoutes } from '@app/pages';
import { useLocalSession } from '@app/hooks';
import { CommanderContainerProps, ServiceApp } from '@app/interfaces';
import 'react-phone-input-2/lib/style.css';
import '@app/styles/vendorStyles/app.css';
import '@app/styles/vendorStyles/vendor.css';

import { createBrandApiConfig } from './createBrandApiConfig';

export const BrandApp: VFC<CommanderContainerProps> = ({
  isContainerAppActive,
  toggleSidebar,
}) => {
  const {
    barber,
    barbers,
    brand,
    currency,
    session,
    shop,
    shops,
    userKind,
    view,
  } = useLocalSession();

  const config = createBrandApiConfig({
    barber,
    barbers,
    brand,
    currency,
    shop,
    shops,
    userKind,
    view,
  });

  if (!session) {
    return null;
  }

  if (!shop?.id) {
    throw new Error('No shop ID specified');
  }

  if (!brand?.id) {
    throw new Error('No brand ID specified');
  }

  return (
    <ServicesApiContextProvider config={config as ServiceApp}>
      <AppRoutes
        isContainerAppActive={isContainerAppActive}
        toggleSidebar={toggleSidebar}
      />
    </ServicesApiContextProvider>
  );
};
