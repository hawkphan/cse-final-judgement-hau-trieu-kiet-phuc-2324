/* eslint-disable @typescript-eslint/no-explicit-any */
const LOCAL_STORAGE_LANGUAGE = 'language';
const LOCAL_STORAGE_LOCALE = 'locale';
const LOCAL_STORAGE_TRANSLATION = 'translation';
const DEFAULT_LANGUAGE = 'en';

const setTranslation = (translation: unknown) => {
  localStorage.setItem(LOCAL_STORAGE_TRANSLATION, JSON.stringify(translation));
};

const getTranslation = () => {
  const result = localStorage.getItem(LOCAL_STORAGE_TRANSLATION);
  if (result) return JSON.parse(result);
  return {};
};

const setLocale = (language: any) => {
  localStorage.setItem(LOCAL_STORAGE_LOCALE, JSON.stringify(language));
};

const getLocale = (): any => {
  const result = localStorage.getItem(LOCAL_STORAGE_LOCALE);
  if (result) return JSON.parse(result);
  return { code: DEFAULT_LANGUAGE };
};

const getLanguage = () => {
  const locale = getLocale();
  return locale.code;
};

const setLanguage = (language: unknown) => {
  localStorage.setItem(LOCAL_STORAGE_LANGUAGE, JSON.stringify(language));
};

export default {
  setLocale,
  getLocale,
  setTranslation,
  getTranslation,
  getLanguage,
  setLanguage,
};
