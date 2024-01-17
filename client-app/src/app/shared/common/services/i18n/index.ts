import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageService from '../language';
import configs from '../../../../configs';

const translation = LanguageService.getTranslation();

i18n.use(initReactI18next).init({
  lng: 'all',
  resources: {
    all: {
      translation: { ...translation },
    },
  },
  fallbackLng: 'all',
  /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
  nsSeparator: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  returnEmptyString: false,
  parseMissingKeyHandler: (key) => {
    if (configs.APP_ENV === 'dev') return `[${key}]`;
    return key;
  },
  // react: {
  //   wait: true,
  // },
});

export default i18n;
