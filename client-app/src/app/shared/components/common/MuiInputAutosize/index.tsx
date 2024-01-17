/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, TextField, TextFieldProps } from '@mui/material';
import cn from 'classnames';
import { FC, MouseEventHandler, forwardRef, useRef } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { Icon } from '..';
import Element from '../Element';
import './styles.scss';
import { COLOR_CODE, getRandomId, isEmpty } from '../../..';

const MuiInputAutosize: FC<InputAutosizeProps> = forwardRef(
  (
    {
      errorMessage,
      label,
      containerClassName,
      iconName = '',
      resize = 'none',
      required,
      disabled,
      maxLength,
      footer,
      placeholder,
      onIconClick,
      ...props
    },
    ref,
  ) => {
    const id = useRef<string>(`input-${getRandomId()}`);

    return (
      <Element
        id={id.current}
        errorMessage={errorMessage}
        label={label}
        className={cn(containerClassName, 'cmp-field-area')}
        required={required}
      >
        <Box>
          <TextField
            id={id.current}
            disabled={disabled}
            multiline
            ref={ref}
            sx={{
              ...props.sx,
              background: COLOR_CODE.WHITE,

              '& fieldset': {
                top: 0,
              },
              '& legend': {
                display: 'none',
              },
              '& .MuiInputBase-root': {
                padding: '6px 14px',

                '&.Mui-focused fieldset': {
                  borderColor: !isEmpty(errorMessage) ? COLOR_CODE.DANGER : COLOR_CODE.PRIMARY,
                  borderWidth: '1px',
                },

                '&.Mui-disabled': {
                  backgroundColor: COLOR_CODE.BG_DISABLED,
                },
              },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'black',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: COLOR_CODE.DEFAULT_BORDER,
                borderColor: !isEmpty(errorMessage) && COLOR_CODE.DANGER,
                borderRadius: COLOR_CODE.DEFAULT_BORDER_RADIUS,
              },
            }}
            inputProps={{
              ...props.inputProps,
              maxLength,
              sx: {
                ...props.inputProps?.sx,
                resize,
              },
            }}
            fullWidth
            {...props}
          />
          {iconName && (
            <Icon name={iconName} className="cmp-input-autosize__icon" onClick={onIconClick} />
          )}
        </Box>
        {footer && <Box mt={1}>{footer}</Box>}
      </Element>
    );
  },
);

const FormInputAutosize = ({ control, ...props }: FormInputAutosizeProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return (
    <MuiInputAutosize
      label={props.label}
      {...props}
      {...field}
      errorMessage={fieldState.error?.message}
    />
  );
};

type FormInputAutosizeProps<T = any> = UseControllerProps<T> & InputAutosizeProps;

export type InputAutosizeProps = TextFieldProps & {
  errorMessage?: string;
  containerClassName?: string;
  iconName?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  required?: boolean;
  resize?: 'horizontal' | 'vertical' | 'both' | 'none';
  maxLength?: number;
  footer?: React.ReactNode;
  onIconClick?: MouseEventHandler<HTMLElement>;
};

export { FormInputAutosize, MuiInputAutosize };
