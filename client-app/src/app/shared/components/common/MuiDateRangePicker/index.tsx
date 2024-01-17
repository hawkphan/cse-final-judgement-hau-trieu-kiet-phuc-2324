/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CalendarMonthOutlined } from '@mui/icons-material';

import { TextFieldProps } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

import { MuiInput } from '..';
import './styles.scss';
import { emptyFunction, formatDate } from '../../..';
import DateRangePicker from '../DateRangePicker';

const DateRangeInputField: React.FC<{
  startProps: TextFieldProps;
  endProps: TextFieldProps;
  inputProps?: InputProps;
}> = ({
  startProps: {
    inputRef: _,
    ref: __,
    focused: startFocus,
    error: _error,
    inputProps: startInputProps,
    ...startProps
  },
  endProps: { focused: endFocus, inputProps: endInputProps, ..._endProps },
  inputProps = {},
}) => {
  const startValue = startInputProps.value;
  const endValue = endInputProps.value;
  const value = dayjs(endValue).isValid()
    ? `${formatDate(startValue)} - ${formatDate(endValue)}`
    : '';
  const focused = startFocus || endFocus;
  return (
    <MuiInput
      focused={focused}
      {...startProps}
      inputProps={{
        ...startInputProps,
        value,
        placeholder: inputProps.placeholder,
        readOnly: true,
        sx: {
          '&:hover': {
            cursor: 'pointer',
          },
        },
      }}
      {...inputProps}
      InputProps={{
        endAdornment: <CalendarMonthOutlined />,
      }}
    />
  );
};

interface InputProps {
  errorMessage?: string;
  placeholder?: string;
  label?: string;
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
  onClick?: (..._args: any[]) => void;
}

type CustomDateRangePickerProps = Partial<
  Omit<any, 'onChange' | 'value'> & {
    onChange: (_name: string, _value: [Date, Date]) => void;
    value: [string | number | Date | Dayjs, string | number | Date | Dayjs];
    name: string;
  }
>;

const Input: React.FC<CustomDateRangePickerProps & InputProps> = ({
  errorMessage,
  placeholder = 'MM/DD/YYYY - MM/DD/YYYY',
  label,
  required,
  infoTooltipMessage,
  infoTooltipPlacement,
  infoToolTipWithArrow,
  name = '',
  onChange = emptyFunction,
  value = [null, null],
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceClose = useCallback(
    debounce(() => setOpen(false), 300),
    [],
  );

  const handleChange = (value: any) => {
    const [start, end] = value;
    if (dayjs(end).isValid()) {
      debounceClose();
      return onChange(name, [dayjs(start).toDate(), dayjs(end).toDate()]);
    }
  };
  return (
    <DateRangePicker
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(startProps, endProps) => (
        <DateRangeInputField
          startProps={startProps}
          endProps={endProps}
          inputProps={{
            errorMessage,
            placeholder,
            label,
            required,
            infoTooltipMessage,
            infoTooltipPlacement,
            infoToolTipWithArrow,
            onClick: () => setOpen(true),
          }}
        />
      )}
      onChange={handleChange}
      value={value}
      PopperProps={{
        className: 'cmp-date-range-mui__popper',
      }}
      {...props}
    />
  );
};

export default Input;
