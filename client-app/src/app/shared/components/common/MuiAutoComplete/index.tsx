/* eslint-disable @typescript-eslint/no-explicit-any */

import { Autocomplete, AutocompleteProps } from "@mui/material";
import { LazyCheckPoint, MuiInput } from "..";
import { emptyFunction } from "../../..";

const MuiAutoCompleteCmp: React.FC<MuiAutoCompleteProps> = ({
  options,
  label,
  errorMessage = "",
  required = false,
  isLoading = false,
  onChange = emptyFunction,
  value,
  limitRender,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  name,
  popupIcon,
  isGetOptionOnChange = false,
  onFetchNextPage,
  allowLazyLoad,
  placeholder,
  disabled,
  isIgnoreTranslate = false,
  ...props
}) => {
  const handleChange = (_: unknown, value: SelectOption) =>
    onChange(name, isGetOptionOnChange ? value : value?.value);
  const selectedValue = value
    ? options.find((i) => i.value === value) || null
    : null;

  return (
    <Autocomplete
      limitTags={limitRender}
      onChange={handleChange}
      options={options}
      renderInput={({ ...params }) => (
        <MuiInput
          {...params}
          {...{
            label,
            required,
            errorMessage,
            placeholder,
            infoToolTipWithArrow,
            infoTooltipMessage,
            infoTooltipPlacement,
            name,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      loading={isLoading}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderWidth: 1,
          },
        },
        "& .MuiPaper-root": {
          display: disabled ? "none" : "block",
        },
        "& .MuiAutocomplete-endAdornment": {
          button: {
            transform: popupIcon ? "none" : undefined,
          },
        },
      }}
      isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
      value={selectedValue}
      popupIcon={popupIcon}
      renderOption={(props, option) => {
        if (
          allowLazyLoad &&
          options.at(options.length - 1)?.value === option?.value
        ) {
          return (
            <LazyCheckPoint onFirstEnter={onFetchNextPage} key={option.value}>
              <li {...props} key={option.value}>
                {isIgnoreTranslate ? option.label : option.label}
                <span className="ml-auto pl-2">
                  {option.endLabel ? option.endLabel : null}
                </span>
              </li>
            </LazyCheckPoint>
          );
        }

        return (
          <li {...props} key={option.value}>
            {isIgnoreTranslate ? option.label : option.label}
            <span className="ml-auto pl-2">
              {option.endLabel ? option.endLabel : null}
            </span>
          </li>
        );
      }}
      disabled={disabled}
      // open={disabled ? false : undefined}
      {...props}
    />
  );
};

type BaseInputProps = Pick<
  AutocompleteProps<any, boolean | undefined, boolean | undefined, undefined>,
  Exclude<
    keyof AutocompleteProps<
      any,
      boolean | undefined,
      boolean | undefined,
      undefined
    >,
    "label" | "renderInput" | "options" | "value" | "multiple"
  >
>;
export interface SelectOption {
  label?: string | React.ReactNode;
  value: any;
  prefix?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  key?: any;
  endLabel?: React.ReactNode;
}
export type MuiAutoCompleteProps = Omit<
  BaseInputProps,
  "onBlur" | "onChange"
> & {
  options?: SelectOption[];
  label?: string | React.ReactNode;
  className?: string;
  value?: any;
  errorMessage?: string;
  placeholder?: string;
  containerClassName?: string;
  name?: string;
  required?: boolean;
  isLoading?: boolean;
  isClickable?: boolean;
  onChange?: (..._args: any[]) => void;
  onBlur?: (..._args: any[]) => void;
  onInputChange?: (..._args: any[]) => void;
  limitRender?: number;
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
  isGetOptionOnChange?: boolean;
  allowLazyLoad?: boolean;
  onFetchNextPage?: (..._args: any[]) => void;
  isIgnoreTranslate?: boolean;
};

export default MuiAutoCompleteCmp;
