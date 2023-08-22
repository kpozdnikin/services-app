import { UserType } from '@app/types';
import { BASE_NAMES } from '@app/constants';

export const userTypeByUrl = (): UserType => {
  if (window.location.pathname.includes(BASE_NAMES.barber)) {
    return 'barber';
  }

  if (window.location.pathname.includes(BASE_NAMES.brand)) {
    return 'brand';
  }

  if (window.location.pathname.includes(BASE_NAMES.shop)) {
    return 'shop';
  }

  return 'admin';
};
