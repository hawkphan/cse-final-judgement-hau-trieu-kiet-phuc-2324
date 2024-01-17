/* eslint-disable @typescript-eslint/no-explicit-any */

import { Typography } from '@mui/material';
import cn from 'classnames';
import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input';
import React, { RefObject, forwardRef } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

import { InputLabel } from '../MuiInput';
import { COLOR_CODE, emptyFunction, isEmpty } from '../../..';

const PhoneInput: React.FC<MuiInputPhoneProps> = ({
  errorMessage,
  label,
  className,
  required,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  sx = {},
  name = '',
  onChange = emptyFunction,
  menuMaxHeight = '340px',
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  // const hasLabel = !isEmpty(label);

  const handleChange = (value: string) => {
    onChange(name, value || '');
  };

  return (
    <MuiTelInput
      forceCallingCode
      defaultCountry="US"
      variant="outlined"
      className={cn('cmp-mui-phone-input', className)}
      label={
        <InputLabel
          {...{ infoTooltipMessage, infoTooltipPlacement, infoToolTipWithArrow, label, required }}
        />
      }
      error={hasError}
      helperText={errorMessage}
      onChange={handleChange}
      sx={{
        ...sx,
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderWidth: 1,
          },
          '&.MuiInputBase-hiddenLabel fieldset': {
            marginTop: '5px',
          },
          '& fieldset legend': {
            display: 'none',
          },
        },
        '& .MuiInputLabel-root': {
          position: 'relative',
          transform: 'none',
          marginBottom: 1,
          '&.Mui-focused': {
            color: COLOR_CODE.PRIMARY,
          },
        },
        width: '100%',
      }}
      MenuProps={{ sx: { maxHeight: menuMaxHeight } }}
      FormHelperTextProps={{
        sx: {
          fontSize: 14,
          marginLeft: 0,
        },
      }}
      focusOnSelectCountry
      hiddenLabel
      {...props}
    />
  );
};

type BaseInputProps = Pick<MuiTelInputProps, Exclude<keyof MuiTelInputProps, 'label' | 'onChange'>>;
export type MuiInputPhoneProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  inputRef?: RefObject<HTMLInputElement>;
  label?: string | React.ReactNode;
  required?: boolean;
  infoTooltipMessage?: string;
  infoTooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  infoToolTipWithArrow?: boolean;
  onChange?: (..._args: any[]) => void;
  menuMaxHeight?: string;
};

type FormInputProps<T = any> = UseControllerProps<T> & MuiInputPhoneProps & { isViewing?: boolean };

const FormPhoneInput = forwardRef<HTMLDivElement, FormInputProps>(
  ({ control, onChange, isViewing, ...props }: FormInputProps, ref) => {
    const { field, fieldState } = useController({ name: props.name, control });

    if (isViewing) {
      return (
        <>
          <InputLabel {...props} />
          <Typography variant="body1" fontWeight={400}>
            {field.value ?? '-'}
          </Typography>
        </>
      );
    }

    return (
      <PhoneInput
        label={props.label}
        {...props}
        {...field}
        onChange={onChange}
        errorMessage={fieldState.error?.message}
        ref={ref}
      />
    );
  },
);

export { FormPhoneInput, PhoneInput };
