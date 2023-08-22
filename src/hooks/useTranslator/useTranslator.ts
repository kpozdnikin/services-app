import { useContext } from 'react';
import { Namespace, TFunction } from 'react-i18next';

import { LocaleContext } from '@app/contexts';

export const useTranslator = (): TFunction<Namespace<'app'>> => {
  const { t } = useContext(LocaleContext);
  return t;
};
