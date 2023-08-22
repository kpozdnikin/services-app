import { createContext } from 'react';
import { Namespace, TFunction } from 'react-i18next';

import { AppLocale } from '@app/i18n';

export interface LocaleContextValue {
  readonly locale: string;
  readonly setLocale: (locale: AppLocale) => void;
  readonly t: TFunction<Namespace<'app'>>;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: AppLocale.en,
  setLocale: () => null,
  t: () => null,
});
