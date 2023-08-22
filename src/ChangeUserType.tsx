import { VFC } from 'react';

import { BASE_NAMES } from '@app/constants';

import type { UserType } from './types';

interface ChangeUserTypeProps {
  setUserType: (userType: UserType) => void;
  userType: UserType;
}

export const ChangeUserType: VFC<ChangeUserTypeProps> = ({ userType }) => {
  const onSetUserType = (type: UserType) => {
    window.location.href = BASE_NAMES[type];
  };

  return (
    <>
      <button
        style={{ background: userType === 'brand' ? 'blue' : '' }}
        onClick={() => onSetUserType('brand')}
      >
        Brand
      </button>
      <button
        style={{ background: userType === 'shop' ? 'blue' : '' }}
        onClick={() => onSetUserType('shop')}
      >
        Shop
      </button>
      <button
        style={{ background: userType === 'barber' ? 'blue' : '' }}
        onClick={() => onSetUserType('barber')}
      >
        Barber
      </button>
    </>
  );
};
