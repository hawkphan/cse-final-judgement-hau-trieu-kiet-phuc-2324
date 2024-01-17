/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { IMaskInput } from "react-imask";

import { MuiInput } from "..";
import { MuiInputProps } from "../MuiInput";
import { emptyFunction } from "../../..";

export type ChangeEventPayload = {
  target: { name: string; value: any };
  currentTarget: { name: string; value: any };
};

export type CustomMaskInputProps = any & {
  onChange: (_event: ChangeEventPayload) => void;
  name: string;
};

const TextMaskCustom: React.FC<CustomMaskInputProps> = ({ ...props }) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      onAccept={(value: any) => {
        onChange({
          target: { name: props.name, value },
          currentTarget: { name: props.name, value },
        });
      }}
      onChange={emptyFunction}
      overwrite
    />
  );
};
// where definitions are:
// 0 - any digit
// a - any letter
// * - any char
// other chars which is not in custom definitions supposed to be fixed
// [] - make input optional
// {} - include fixed part in unmasked value
// ` - prevent symbols shift back
// If definition character should be treated as fixed it should be escaped by \\ (E.g. \\0).

// Additionally you can provide custom definitions:
// mask: '#00000',
// definitions: {
//   // <any single char>: <same type as mask (RegExp, Function, etc.)>
//   // defaults are '0', 'a', '*'
//   '#': /[1-6]/
// }
const MuiInputMask: React.FC<MuiInputProps & any> = ({
  errorMessage,
  ref: _1,
  inputRef: _2,
  ...props
}) => (
  <MuiInput
    {...props}
    errorMessage={errorMessage}
    InputProps={{
      inputComponent: TextMaskCustom as any,
      inputProps: props,
    }}
  />
);

export default MuiInputMask;
