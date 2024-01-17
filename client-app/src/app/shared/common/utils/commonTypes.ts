/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { ComponentProps, ComponentType, memo } from 'react';
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export type FormProps<T = unknown> = {
  control?: Control<T>;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
};

export type CommonFormikProps<T> = {
  values: T;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<T>>;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<T>>;
  getUncontrolledFieldProps?: (
    name: string,
    options?: { onBlur: (name: any, values: any) => void },
  ) => any;
};

type PropsComparator<C extends ComponentType> = (
  prevProps: Readonly<ComponentProps<C>>,
  nextProps: Readonly<ComponentProps<C>>,
) => boolean;

/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#
 */
export function typedMemo<C extends ComponentType<any>>(
  Component: C,
  propsComparator?: PropsComparator<C>,
) {
  return memo(Component, propsComparator) as any as C;
}

export interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

export enum YesNoValue {
  YES = 'YES',
  NO = 'NO',
}

export enum FileType {
  Image = 'IMAGE',
  Document = 'DOCUMENT',
  External = 'EXTERNAL_LINK',
  EmailConfirmation = 'EMAIL_CONFIRMATION',
}

export interface UploadFileType {
  id: string;
  file?: File & { path?: string };
  url?: string;
  name?: string;
  isExternalLink?: boolean;
  type: FileType;
}
