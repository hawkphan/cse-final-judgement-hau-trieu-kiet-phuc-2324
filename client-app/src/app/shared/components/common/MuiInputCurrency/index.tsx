import React from 'react';
import { MuiInputMask } from '..';
import { MuiInputProps } from '../MuiInput';
import { ChangeEventPayload, CustomMaskInputProps } from '../MuiInputMask';

const MuiInputCurrency: React.FC<
  MuiInputProps &
    Pick<CustomMaskInputProps, Exclude<keyof CustomMaskInputProps, 'mask' | 'blocks'>> & {
      onChange: (_event: ChangeEventPayload) => void;
      isAllowNegative?: boolean;
    }
> = ({ isAllowNegative = true, ...props }) => (
  <MuiInputMask
    {...props}
    mask="$ num"
    blocks={{
      num: {
        mask: Number,
        thousandsSeparator: ',',
        scale: 2,
        radix: '.',
        signed: isAllowNegative,
      },
    }}
  />
);

export default MuiInputCurrency;
