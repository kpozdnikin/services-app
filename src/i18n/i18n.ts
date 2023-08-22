import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { AppLocale } from './locales';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: AppLocale.en,
    fallbackLng: AppLocale.en,
    ns: ['app'], // it's always one namespace
    defaultNS: 'app',
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: 'onAdded',
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const i18n = i18next;
