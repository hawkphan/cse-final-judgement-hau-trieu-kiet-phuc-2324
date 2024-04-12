import dayjs, { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { isEmpty } from './validations';

dayjs.extend(weekday);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(duration);

dayjs.extend(relativeTime, {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 29, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 1 },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
});

export interface GetFromNowOptions {
  thresholdUnit?: QUnitType | OpUnitType;
  thresholdValue?: number;
  format?: string;
}

export const DateFormat = 'MM/DD/YYYY';
export const DateFormatWithHour = 'MM/DD/YYYY HH:mm';
export const DateFormatDisplay = 'MMMM DD, YYYY';
export const DateFormatWithYear = 'YYYY-MM-DD';
export const DateFormatDisplayShort = 'MMM DD, YYYY';
export const DateFormatDisplayMinute = 'MM/DD/YYYY hh:mm A';

export const TimeFormat = 'HH:mm';
export const TimeFormat12 = 'hh:mm A';
export const HST_TIMEZONE = 'US/Hawaii';

export const hourDateFormat = 'h:mm:ss a, MMMM DD, YYYY';
export const dateTimeFormat = 'MM/DD/YYYY HH:MM:ss A';
export const hourDateFormatShort = 'HH:mm MM-DD-YYYY';
export const monthFormat = 'MMMM DD, YYYY';

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string, format: string = DateFormat) =>
  value ? dayjs(value).format(format) : null;

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => dayjs(value).format(TimeFormat);

export const getTimeDisplayFromNow = (value: string) => dayjs(value).fromNow();

/// dayjs has many cases incorrect format with timezone so using moment-timezone for this case
/// Reference issues : https://github.com/iamkun/dayjs/issues/1827
export const localTimeToHawaii = (dateTime: Dayjs, format = DateFormatDisplayMinute) => {
  if (!dateTime) return null;

  const date = dayjs(dateTime).format(DateFormatWithHour);
  return dayjs(date, DateFormatWithHour).utcOffset('-1000').format(format);
};

export const formatDateUtc = (value: Date | string, format: string = DateFormat) => {
  if (!value || (typeof value === 'string' && isEmpty(value))) {
    return '';
  }
  return dayjs(value).utc().format(format);
};

export const formatSecondToTimer = (seconds: number, format = 'HH:mm:ss') => {
  if (!seconds) return `${format}`;
  const durationObject = dayjs.duration(seconds, 'seconds');
  const formattedTime = durationObject.format(format);
  return formattedTime;
};

export const isOutOperationHours = (operationTimeObj: { open: string; close: string }) => {
  const now = dayjs().tz(HST_TIMEZONE).format(TimeFormat);
  const open = operationTimeObj?.open;
  const close = operationTimeObj?.close;
  const isBeforeOpen = now < open;
  const isAfterClose = now > close;

  return isBeforeOpen || isAfterClose;
};

export const isTimeInPast = (timeString: string) => {
  const givenTime = new Date(timeString);
  const currentTime = new Date();
  return givenTime < currentTime;
}

export const getFromNow = (value: string, options?: GetFromNowOptions) => {
  if (!value) return null;

  const { thresholdUnit = 'hour', thresholdValue = 24, format = DateFormat } = options || {};
  const timeDifference = dayjs().diff(dayjs(value), thresholdUnit, true);
  if (timeDifference > thresholdValue) return dayjs(value).format(format);

  return dayjs(value).fromNow();
};
