/* eslint-disable @typescript-eslint/no-explicit-any */

import { TextField, TextFieldProps, Tooltip } from "@mui/material";
import React from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { IoInformationCircle } from "react-icons/io5";
import { InputAutosizeProps } from "../MuiInputAutosize";
import Typo from "../Typo";
import { COLOR_CODE, isEmpty } from "../../..";

export const InputLabel: React.FC<
  Pick<
    MuiInputProps,
    | "label"
    | "required"
    | "infoTooltipMessage"
    | "infoToolTipWithArrow"
    | "infoTooltipPlacement"
  >
> = ({
  label,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  required,
}) => {
  const hasLabel = !isEmpty(label);

  if (!hasLabel) return null;
  return (
    <Typo variant="body2" fontWeight={500} height={20}>
      {label}{" "}
      {required && (
        <span className="has-text-danger fw-bold text-is-16">*</span>
      )}
      {infoTooltipMessage && (
        <Tooltip
          arrow={infoToolTipWithArrow}
          title={
            <span style={{ whiteSpace: "pre-line" }}>{infoTooltipMessage}</span>
          }
          placement={infoTooltipPlacement}
        >
          <i className="cursor-pointer ml-1">
            <IoInformationCircle
              size={18}
              color={COLOR_CODE.INFO}
              style={{
                transform: "translateY(2px)",
              }}
            />
          </i>
        </Tooltip>
      )}
    </Typo>
  );
};

const MuiInput: React.FC<MuiInputProps> = React.forwardRef(
  (
    {
      errorMessage,
      label,
      className,
      required,
      infoToolTipWithArrow,
      infoTooltipMessage,
      infoTooltipPlacement,
      sx = {},
      InputProps = {},
      readOnly,
      placeholder,
      ...props
    },
    ref
  ) => {
    const hasError = !isEmpty(errorMessage);
    return (
      <TextField
        label={
          <InputLabel
            {...{
              infoTooltipMessage,
              infoTooltipPlacement,
              infoToolTipWithArrow,
              label,
              required,
            }}
          />
        }
        {...(placeholder && {
          placeholder: placeholder as string,
        })}
        className={className}
        variant="outlined"
        error={hasError}
        helperText={errorMessage}
        ref={ref}
        fullWidth
        size="small"
        sx={{
          ...sx,
          "& .MuiInputLabel-root": {
            position: "relative",
            transform: "none",
            marginBottom: "4px",
            "&.Mui-focused": {
              color: COLOR_CODE.PRIMARY,
            },
            "&.Mui-disabled": {
              background: "transparent",
            },
          },
          "& .MuiOutlinedInput-root": {
            minHeight: 40,
            "&.MuiAutocomplete-inputRoot.MuiInputBase-sizeSmall": {
              pt: "8.5px",
              pb: "8.5px",
            },
            "&.Mui-disabled": {
              backgroundColor: COLOR_CODE.DISABLED_INPUT,
            },
            "&.Mui-disabled fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              borderWidth: 1,
              borderColor: COLOR_CODE.PRIMARY,
            },
            "&.MuiInputBase-hiddenLabel fieldset": {
              marginTop: "5px",
            },
            "& fieldset legend": {
              display: "none", // hasLabel ? 'block' : 'none',
            },
            "& .MuiOutlinedInput-notchedOutline,fieldset": {
              "&:hover": {
                borderColor: COLOR_CODE.PRIMARY,
              },
            },
          },
        }}
        FormHelperTextProps={{
          sx: {
            fontSize: 14,
            marginLeft: 0,
          },
        }}
        hiddenLabel
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{ ...InputProps, readOnly }}
        {...props}
      />
    );
  }
);

const FormInput = ({ control, ...props }: FormInputProps) => {
  const { field, fieldState } = useController({ name: props.name, control });

  return (
    <MuiInput
      label={props.label}
      {...props}
      {...field}
      errorMessage={fieldState.error?.message}
    />
  );
};

type FormInputProps<T = any> = UseControllerProps<T> & InputAutosizeProps;

type BaseInputProps = Pick<
  TextFieldProps,
  Exclude<keyof TextFieldProps, "label" | "placeholder">
>;
export type MuiInputProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  required?: boolean;
  infoTooltipMessage?: string;
  infoTooltipPlacement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  infoToolTipWithArrow?: boolean;
  readOnly?: boolean;
};

export { FormInput, MuiInput };
