import { useMemo, useState, useCallback, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLocale, i18n } from '@app/i18n';

import { LocaleContext, LocaleContextValue } from './LocaleContext';

interface LocaleProviderProps {
  initialLocale?: { [key: string]: unknown };
}

const DEFAULT_NS = 'app';

export const LocaleProvider: FC<LocaleProviderProps> = (props) => {
  const [locale, setLocale] = useState<string>(AppLocale.en);

  const { t } = useTranslation();

  // needs an update when multiple locales are used
  if (props.initialLocale && !i18n.hasResourceBundle(AppLocale.en, DEFAULT_NS)) {
    i18n.addResourceBundle(AppLocale.en, DEFAULT_NS, props.initialLocale);
  }

  const changeLocale = useCallback((nextLocale: AppLocale) => {
    if (nextLocale === i18n.language) {
      return;
    }

    i18n.changeLanguage(nextLocale, () => setLocale(nextLocale));
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      t,
      locale,
      setLocale: changeLocale,
    };
  }, [locale, changeLocale, t]);

  return <LocaleContext.Provider value={value}>{props.children}</LocaleContext.Provider>;
};
