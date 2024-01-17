/* eslint-disable @typescript-eslint/no-explicit-any */

import { Autocomplete, AutocompleteProps, createFilterOptions } from '@mui/material';

import { MuiInput } from '..';
import { emptyFunction } from '../../..';

const filter = createFilterOptions<SelectOption>();
const MuiAutoCompleteCreatableCmp: React.FC<MuiAutoCompleteCreatableProps> = ({
  options,
  label,
  errorMessage = '',
  required = false,
  isDisabled = false,
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
  placeholder,
  ...props
}) => {
  const handleChange = (_: unknown, value: SelectOption | string) => {
    if (typeof value === 'string') {
      return onChange(name, isGetOptionOnChange ? { label: value, value } : value);
    }
    return onChange(name, isGetOptionOnChange ? value : value?.value);
  };

  const selectedValue = value
    ? options.find((i) => i.value === value) || { label: value, value }
    : null;

  return (
    <Autocomplete
      limitTags={limitRender}
      onChange={handleChange}
      disabled={isDisabled}
      options={options}
      renderInput={({ InputProps, ...params }) => (
        <MuiInput
          {...params}
          {...{
            label,
            required,
            errorMessage,
            infoToolTipWithArrow,
            infoTooltipMessage,
            infoTooltipPlacement,
            name,
            placeholder,
          }}
          InputProps={{
            ...InputProps,
            endAdornment: InputProps.endAdornment ?? popupIcon,
          }}
        />
      )}
      loading={isLoading}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderWidth: 1,
          },
        },
        '& .MuiPaper-root': {
          display: isDisabled ? 'none' : 'block',
        },
        '& .MuiAutocomplete-endAdornment': {
          button: {
            transform: popupIcon ? 'none' : undefined,
          },
        },
      }}
      isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
      value={selectedValue}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.label);
        if (inputValue && !isExisting) {
          filtered.push({
            value: inputValue,
            label: `Add "${inputValue}"`,
          } as SelectOption);
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.label;
      }}
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      popupIcon={popupIcon}
      {...props}
    />
  );
};

type BaseInputProps = Pick<
  AutocompleteProps<any, boolean | undefined, boolean | undefined, boolean | undefined>,
  Exclude<
    keyof AutocompleteProps<any, boolean | undefined, boolean | undefined, boolean | undefined>,
    'label' | 'renderInput' | 'options' | 'value' | 'multiple'
  >
>;
export interface SelectOption {
  label: string;
  value: any;
  [key: string]: string | number;
}
export type MuiAutoCompleteCreatableProps = Omit<BaseInputProps, 'onBlur' | 'onChange'> & {
  options?: SelectOption[];
  label?: string | React.ReactNode;
  className?: string;
  value?: any;
  errorMessage?: string;
  placeholder?: string;
  containerClassName?: string;
  name?: string;
  required?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClickable?: boolean;
  onChange?: (..._args: any[]) => void;
  onBlur?: (..._args: any[]) => void;
  onInputChange?: (..._args: any[]) => void;
  limitRender?: number;
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
  isGetOptionOnChange?: boolean;
  allowLazyLoad?: boolean;
  onFetchNextPage?: (..._args: any[]) => void;
};

export default MuiAutoCompleteCreatableCmp;
