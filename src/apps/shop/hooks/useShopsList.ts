import { UseQueryResult } from 'react-query';

import { useServiceApp } from '@app/hooks';
import { ShopsList } from '@app/interfaces';

// TODO: add task to fetch shop
export const useShopsList = () => {
  const { shop } = useServiceApp();

  return {
    data: {
      shops: shop ? [shop] : [],
    },
    status: 'success',
  } as UseQueryResult<ShopsList>;
};
