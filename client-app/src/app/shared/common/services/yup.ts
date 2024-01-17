/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';
import { ErrorService } from '.';

export type ConditionalSchema<T> = T extends string
  ? yup.StringSchema
  : T extends number
  ? yup.NumberSchema
  : T extends boolean
  ? yup.BooleanSchema
  : T extends Record<any, any>
  ? yup.AnyObjectSchema
  : T extends Array<any>
  ? yup.ArraySchema<any, any>
  : yup.AnySchema;

export type CustomShape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

yup.setLocale({
  mixed: {
    required: ErrorService.MESSAGES.required,
  },
  string: {
    email: ErrorService.MESSAGES.invalidEmail,
    // eslint-disable-next-line
    min: 'This field must be at least ${min} characters',
    // eslint-disable-next-line
    max: 'You have reached the maximum length of ${max} characters.',
  },
});

declare module 'yup' {
  interface StringSchema {
    phone(_message?: string): StringSchema;
    password(_message?: string): StringSchema;
    letterOnly(_message?: string): StringSchema;
    numberOnly(_message?: string): StringSchema;
    notTrimmable(_message?: string): StringSchema;
    username(_message?: string): StringSchema;
  }

  interface ArraySchema<TIn, TContext, TDefault, TFlags> {
    unique(field: string, message: string): ArraySchema<TIn, TContext, TDefault, TFlags>;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'phone', function (message) {
  return this.test('isValidPhone', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!isValidPhoneNumber(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.invalidPhone,
      });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'password', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (!/.{8,}/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must be at least 8 characters.',
      });
    }
    if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at least one upper and lower case letter',
      });
    }
    if (!/[0-9]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at one number',
      });
    }
    if (!/.*[!@#$%?=*&.]/.test(value)) {
      return createError({
        path,
        message: message ?? 'Your password must have at one special character',
      });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'username', function (message) {
  return this.test('isValidUsername', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    //     allow
    //      characters
    //      number
    //      underscore _
    //      dot .
    //      hyphen -
    //      length: 3-100
    //    not allow
    //      space
    if (value.includes(' ')) {
      return createError({
        path,
        message: message ?? 'Space character is not allowed. Please remove it',
      });
    }
    if (value.length < 3) {
      return createError({
        path,
        message: message ?? 'This field must be at least 3 characters',
      });
    }
    if (value.length > 100) {
      return createError({
        path,
        message: message ?? 'You have reached the maximum length of 100 characters',
      });
    }
    const re = /^([a-zA-Z0-9_.-]){3,100}$/;

    if (!re.test(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.inValidUsername,
      });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'letterOnly', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    const re = /^[aA-zZ\s]+$/;

    if (!re.test(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.onlyLetter,
      });
    }

    return true;
  });
});

yup.addMethod(yup.string, 'numberOnly', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

yup.addMethod<yup.StringSchema>(yup.string, 'notTrimmable', function (message) {
  return this.test('isValidString', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (/(^\s+|\s+$)/.test(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.notTrimmable,
      });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'letterAndNumber', function (message) {
  return this.test('isValidName', message, function (value) {
    const { path, createError } = this;

    if (!value) return true;

    if (/.*[!@#$%?=*&.]/.test(value)) {
      return createError({
        path,
        message: message ?? ErrorService.MESSAGES.onlyLetterAndNumber,
      });
    }
    return true;
  });
});

yup.addMethod<yup.ArraySchema<any, any>>(yup.array, 'unique', function (field, message) {
  return this.test('unique', message, function (array) {
    const uniqueData = Array.from(new Set(array.map((row: any) => row[field])));
    const isUnique = array.length === uniqueData.length;
    if (isUnique) {
      return true;
    }
    const index = array.findIndex((row: any, i: number) => row[field] !== uniqueData[i]);
    if (array[index][field] === '') {
      return true;
    }
    return this.createError({
      path: `${this.path}.${index}.${field}`,
      message,
    });
  });
});

export default yup;
