import { useContext } from 'react';

import { YupContext } from '@app/contexts';

export const useYup = () => {
  const { yup } = useContext(YupContext);

  return yup;
};
