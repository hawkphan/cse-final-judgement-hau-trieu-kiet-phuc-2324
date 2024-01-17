/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import _, { get, isEqual } from 'lodash';
import { parse } from 'qs';
import { Location } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ErrorService, Toastify, YesNoValue, isEmpty } from '..';

export const emptyFunction = (..._args: any[]) => {};

export const getRandomId = (): string => uuidv4();

export const generateArray = (length: number, initial: any = '') => Array(length).fill(initial);

export const isString = (value: any): value is string => typeof value === 'string';

export const getLocationState = (location: Location) => {
  const locationState = location.state as string;
  const state = parse(locationState, { ignoreQueryPrefix: true });

  return state;
};

export const getWeekDay = (value: string) => {
  if (!value) return '';
  return dayjs(value).format('dddd');
};

export const getClassNameByStatus = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'is-status-pending ';
    case 'Completed':
    case 'Approved':
    case 'Active':
      return 'is-status-active';
    case 'Rejected':
      return 'is-status-rejected';
    default:
      return '';
  }
};

export const getYesNoText = (value: boolean) => (value ? 'Yes' : 'No');

export const getNavigateUrl = (url: string) => (url.includes('http') ? url : `https://${url}`);

export const isURLImage = (url: string) => {
  if (isEmpty(url)) return false;

  const hasExtensionImage = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg',
  ].some((ext) => url?.includes(ext));

  if (hasExtensionImage) {
    return true;
  }

  const state = parse(url?.split('?')[1], { ignoreQueryPrefix: false });
  const contentType = state?.['Content-Type'];
  const isImage = ['image/jpg', 'image/jpeg', 'image/png'].includes(contentType as string);

  return isImage;
};

export const handleGetError = (touched: any, errors: any, prefix: any) =>
  _.get(touched, prefix) ? _.get(errors, prefix) : '';

export const waiter = (time = 100) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise<Array<any>>((res) => setTimeout(() => res([]), time));

export const trimUrlHasEndDate = (url: string) => {
  const trimUrl = url.split('?')[0];
  const items = trimUrl.split('_');
  return items.slice(0, items.length - 1).join('');
};

export const trimUrl = (url: string) => {
  if (!url) return null;
  return url.split('?')[0];
};

export const handleClick =
  (callback: (_arg0: React.MouseEvent) => void) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (callback) callback(event);
  };

// link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
export const deepKeys = (t: unknown, path: string[] = []) => {
  const res: string[] =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter((x: string) => !/\d$/.test(x));
};

export const deepKeysHookFormErrors = (t: unknown, path: string[] = []) => {
  const res: string[] = deepKeys(t, path);

  const filteredRes = res.reduce((output: string[], item) => {
    if (/\d$/.test(item)) {
      return output;
    }

    const replacedItem = item.replace(/(\.type|\.message|\d)$/, '');

    output.push(replacedItem);

    return output;
  }, []);

  return [...new Set(filteredRes)];
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document.querySelector(`[name='${error[0]}']`);
    const { parentElement } = input;
    parentElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    parentElement?.focus({ preventScroll: true });
  }
};

export const handleShowErrorMsg = (error: Error, prefix = '') => {
  let errorMessage = ErrorService.MESSAGES.unknown;
  if (!isEmpty(error)) {
    if (typeof error?.message === 'string') {
      errorMessage = error?.message;
    } else {
      errorMessage = error?.message[0];
    }
    Toastify.error(`${!isEmpty(prefix) ? `${prefix}: ` : ''}${errorMessage}`);
  }
};

export const handleScrollToTopError = <T>(errors: T) =>
  setTimeout(() => {
    scrollToTopError(deepKeys(errors));
  }, 100);

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = get(errors, fieldName);

  return get(touched, fieldName) && error ? error : '';
};

export const isEqualPrevAndNextObjByPath = <T>({
  prevValues,
  nextValues,
  path,
  checkEqualLengthArray,
}: {
  prevValues: T;
  nextValues: T;
  path: string;
  checkEqualLengthArray?: boolean;
}) => {
  const prev = get(prevValues, path);
  const next = get(nextValues, path);
  return checkEqualLengthArray && Array.isArray(prev) && Array.isArray(next)
    ? prev.length === next.length
    : isEqual(prev, next);
};

export const getInputMask = (mask: '0' | 'a' | '*', length = 1) => mask.repeat(length);

export const formatValueOrNull = (value: string | null) => {
  return !isEmpty(value) ? value : '--';
};

export const formatCurrencyOrNull = (value: string | null) => {
  return !isEmpty(value) ? '$' + value : '$0.00';
};

export const formatDateOrNull = (value: string | null) => {
  let result = '';
  if (!isEmpty(value) && !value.startsWith('0')) {
    const year = value.substring(0, 4);
    const month = value.substring(5, 7);
    const day = value.substring(8, 10);
    result = month + '/' + day + '/' + year;
  }
  return result;
};

export const isYesValue = (value: string) => value === YesNoValue.YES;
export const isNoValue = (value: string) => value === YesNoValue.NO;
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getFullName = ({ firstName = '', middleName = '', lastName = '' } = {}) =>
  `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName ? lastName : ''}`;
