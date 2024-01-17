/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from 'lodash';
import { CommonFormikProps } from './commonTypes';
import { convertCurrencyInputToString, MoneyInputDetect } from './format';
import { isEqualPrevAndNextObjByPath } from './handler';
import { FormikErrors } from 'formik';

export const getUncontrolledInputFieldProps =
  <T = any>({
    values,
    setFieldTouched,
    setFieldValue,
  }: {
    values: T;
    setFieldTouched: (
      field: string,
      touched?: boolean,
      shouldValidate?: boolean,
    ) => Promise<void> | Promise<FormikErrors<T>>;
    setFieldValue: (
      field: string,
      value: T,
      shouldValidate?: boolean,
    ) => Promise<void> | Promise<FormikErrors<T>>;
  }) =>
  (name: string, options?: { onBlur: (name: string, value: any) => void }) => {
    return {
      name,
      defaultValue: get(values, name) || '',
      isUncontrolledInput: true,
      onBlur: (event: any) => {
        const value = event.target.value;

        if (options && options.onBlur) {
          return options.onBlur(name, value);
        }

        setFieldTouched(name, true);
        setFieldValue(name, value);
      },
    };
  };

export const getUncontrolledCurrencyInputFieldProps =
  <T = any>({
    values,
    setFieldTouched,
    setFieldValue,
  }: {
    values: T;
    setFieldTouched: (
      field: string,
      touched?: boolean,
      shouldValidate?: boolean,
    ) => Promise<void> | Promise<FormikErrors<T>>;
    setFieldValue: (
      field: string,
      value: T,
      shouldValidate?: boolean,
    ) => Promise<void> | Promise<FormikErrors<T>>;
  }) =>
  (name: string, options?: { onBlur: (name: string, value: any) => void }) => {
    return {
      name,
      defaultValue: get(values, name) || '',
      isUncontrolledInput: true,
      onBlur: (event: any) => {
        const targetValue = event.target.value;
        const value = MoneyInputDetect(targetValue)
          ? convertCurrencyInputToString(targetValue)
          : targetValue;

        if (options && options.onBlur) {
          return options.onBlur(name, value);
        }

        setFieldTouched(name, true);
        setFieldValue(name, value);
      },
    };
  };

export const isEqualPrevAndNextFormikValues = <TFormValue = any>({
  formKeysNeedRender,
  prevFormikProps,
  nextFormikProps,
}: {
  formKeysNeedRender: string[];
  prevFormikProps: CommonFormikProps<TFormValue>;
  nextFormikProps: CommonFormikProps<TFormValue>;
}) => {
  const {
    values: prevFormikValues,
    errors: prevFormikErrors,
    touched: prevFormikTouched,
  } = prevFormikProps;
  const {
    values: nextFormikValues,
    errors: nextFormikErrors,
    touched: nextFormikTouched,
  } = nextFormikProps;

  return !formKeysNeedRender.some(
    (key) =>
      !isEqualPrevAndNextObjByPath({
        prevValues: prevFormikValues,
        nextValues: nextFormikValues,
        path: key,
      }) ||
      !isEqualPrevAndNextObjByPath({
        prevValues: prevFormikErrors,
        nextValues: nextFormikErrors,
        path: key,
      }) ||
      !isEqualPrevAndNextObjByPath({
        prevValues: prevFormikTouched,
        nextValues: nextFormikTouched,
        path: key,
      }),
  );
};
