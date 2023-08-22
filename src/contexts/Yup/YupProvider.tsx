import { FC } from 'react';
import * as yup from 'yup';

import { useTranslator } from '@app/hooks';

import { YupContext } from './YupContext';

export const YupProvider: FC = ({ children }) => {
  const t = useTranslator();

  yup.setLocale({
    mixed: {
      default: t('errors.default'),
      required: t('errors.required'),
      notType: (params) => {
        if (params.type === 'date') {
          return t('errors.date');
        }

        return t('errors.default');
      },
    },
    string: {
      email: t('errors.email'),
      min: t('errors.fieldTooShort'),
      max: t('errors.fieldTooLong'),
    },
  });

  return <YupContext.Provider value={{ yup }}>{children}</YupContext.Provider>;
};
