/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CalendarMonthOutlined } from '@mui/icons-material';
import { TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { MuiInput } from '..';
import { COLOR_CODE, emptyFunction, isEmpty } from '../../..';

const DateInputField: React.FC<TextFieldProps> = ({ inputRef: _, ...props }) => (
  <MuiInput {...props} />
);

interface InputProps {
  errorMessage?: string;
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
}

const Input: React.FC<
  Omit<DatePickerProps<Dayjs>, 'onChange'> & { onChange?: (..._args: any[]) => void } & InputProps
> = ({
  errorMessage,
  required,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  value,
  onChange = emptyFunction,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleChange = (value: string | number | Date | dayjs.Dayjs) => {
    if (dayjs(value).isValid()) onChange((value as dayjs.Dayjs).toDate());
  };
  return (
    <DatePicker
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      slots={{
        textField: DateInputField,
        openPickerIcon: CalendarMonthOutlined,
      }}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
      sx={{
        '& .MuiInputBase-root': { backgroundColor: COLOR_CODE.WHITE },
      }}
      slotProps={{
        textField: (ownerState) => ({
          sx: {
            ...ownerState.sx,
            userSelect: 'none',
            '.MuiInputBase-root input': { cursor: 'pointer' },
          },
          size: 'small',
          onClick: () => setOpen(true),
          focused: open,
          errorMessage,
          error: !isEmpty(errorMessage),
          required,
          infoToolTipWithArrow,
          infoTooltipMessage,
          infoTooltipPlacement,
          readOnly: true,
        }),
        popper: {
          sx: {
            '& > .MuiPaper-root': {
              'div.MuiPickersCalendarHeader-label': {
                fontSize: 16,
              },
              'div.MuiDayCalendar-header': {
                span: {
                  fontSize: 16,
                  fontWeight: 600,
                },
              },
              'div.MuiDayCalendar-monthContainer': {
                button: {
                  fontSize: 14,
                  fontWeight: 400,
                },
              },
              'div.MuiPickersYear-root': {
                button: {
                  fontSize: 16,
                  fontWeight: 400,
                },
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default Input;
