/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import dayjs from 'dayjs';
import parsePhoneNumber from 'libphonenumber-js';
import _ from 'lodash';
import { isEmpty } from './validations';

export const moneyReg = /[\d,]+\.{0,1}\d{0,}/;

export const MoneyInputDetect = (value: number | string) => `${value}`.match(moneyReg)?.[0] || '';

export const convertCurrencyInputToString = (value: string) => value.replace(/[^0-9.-]+/g, '');

export const formatPhoneNumber = (
  mobile: string,
  type?: 'formatInternational' | 'formatNational' | 'getURI',
) => {
  if (!mobile) return '';
  try {
    const phoneNumber = parsePhoneNumber(mobile);
    switch (type) {
      case 'formatInternational':
        return phoneNumber.formatInternational();
      case 'formatNational':
        return phoneNumber.formatNational();
      case 'getURI':
        return phoneNumber.getURI();
      default:
        return phoneNumber.formatInternational().replace(/^(\+\d+)/, '($1)');
    }
  } catch (error) {
    return '';
  }
};

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'MM/DD/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (!value) return '';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

export const formatMoney = (value: number, defaultValue = '') => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) return defaultValue;

  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const formatMoneyInput = (value: number) => {
  if (!value) return '';
  return value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  });
};

export const formatStringToNumber = (value: string) => {
  if (isEmpty(value)) return null;
  return Number(value);
};

export const capitalizeWords = (string: string) =>
  string.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export const getStartCase = (value: string) => (value ? _.startCase(value.toLowerCase()) : '');

export const getTitleCase = (str: string): string => {
  if (!str) return '';
  return _.startCase(_.toLower(str));
};

export const removeSpecialCharacterFromString = (value: string) =>
  value.replace(/[^a-zA-Z0-9 ]/g, '');

export const getStringWithinLength = (value = '', allowedLength = 50, wordLength = 0) => {
  if (!value) return '';
  let trimmedValue = value;
  if (wordLength) {
    trimmedValue = value
      .split(/\s+/)
      .map((x) => (x.length > wordLength ? `${x.slice(0, wordLength)}...` : x))
      .join(' ');
  }
  return trimmedValue.length > allowedLength
    ? `${trimmedValue.slice(0, allowedLength)}...`
    : trimmedValue;
};

export const formatUSPhoneNumber = (phone: string) => {
  const parsePhone = parsePhoneNumber(phone);
  const COUNTRY_CALLING_CODE_OF_US = '1';
  if (parsePhone.countryCallingCode === COUNTRY_CALLING_CODE_OF_US) {
    return parsePhoneNumber(phone).formatNational().replace(/\s+/g, '');
  } else {
    return phone;
  }
};

export const getWordsWithinLength = (string: string, allowedLength = 10) =>
  string.length > allowedLength ? `${string.slice(0, allowedLength)}...` : string;

export const parseJSONString = (input: string) => {
  try {
    // Attempt to parse the input as JSON
    const parsedObject = JSON.parse(input);
    // If parsing succeeds, return the parsed object
    return parsedObject;
  } catch (error) {
    // If parsing fails, return the original string input
    return {
      field: input,
    };
  }
};
