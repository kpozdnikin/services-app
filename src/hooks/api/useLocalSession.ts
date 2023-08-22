import { useSession } from '@getsquire/sage/session';
import {
  getActiveBarber,
  getActiveShop,
} from '@getsquire/sage/session/hooks/useSession/utils';

import { getCurrency } from '@app/selectors/getCurrency';

/*
 *  FIXME: give this a second thought, at a first glance
 *  seems like this logic should be decoupled
 */
export const useLocalSession = () => {
  const session = useSession();

  const barbers = session.data?.user.barbers;
  const activeShopId = localStorage.getItem('shop') ?? null;

  const activeShop = session.data?.user ? getActiveShop(session.data?.user) : null;
  const activeBarber = getActiveBarber({ barbers, activeShopId });
  const barberUserShop = activeBarber?.shop;

  const brand = session.data?.user.brand ?? activeShop?.brand;

  const userKind = session.data?.userKind;
  const currency = getCurrency(session.data);

  return {
    barber: activeBarber,
    barbers,
    brand,
    currency,
    shop: activeShop ?? barberUserShop,
    shops: session.data?.user.shops,
    session: session.data,
    userKind,
    view: session.data?.view,
  };
};
