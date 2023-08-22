import { useContext } from 'react';

import { ServicesApiContext } from '@app/api';
import { ServiceApp } from '@app/interfaces';

export const useServiceApp = (): ServiceApp => {
  const context = useContext(ServicesApiContext);

  if (context === null) {
    throw new Error('No context provided');
  }

  return context;
};
