/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs';

type Field = 'email' | 'password' | 'text';

/* eslint-disable use-isnan */
export const isEmpty = (value: any): boolean =>
  value instanceof Date
    ? !dayjs(value).isValid()
    : !value ||
      value === undefined ||
      value === null ||
      Number.isNaN(value) ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length === 0);

export const validateField = (field: Field, value: any, allowEmpty = false) => {
  if (isEmpty(value) && allowEmpty) return '';

  if (isEmpty(value) && !allowEmpty) return 'Field cannot be blank.';

  if (field === 'email' && !isValidEmail(value)) return 'Email is invalid.';

  return '';
};

// eslint-disable-next-line no-restricted-globals
export const isNumeric = (num: any) => !isNaN(num);

/* eslint-disable no-useless-escape */
export const isValidEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

export const isValidApplicationNumber = (value: string): boolean => {
  const re = /^([A-z][0-9]{2}[-][0-9]{5,10}|[A-z]{3,5}[-][0-9]{5,10})$/;
  return re.test(value) || isEmpty(value);
};
