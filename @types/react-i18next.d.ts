import 'react-i18next';

import en from '../static/locales/en.json';

declare module 'react-i18next' {
  interface Resources {
    app: typeof en;
  }
}
