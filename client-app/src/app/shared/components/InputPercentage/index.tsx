import { MuiInputProps } from '@components/common/MuiInput';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Callback } from 'src/redux/types';
import { MuiInput } from '../..';
import { MoneyInputDetect } from '../../common';

const customInput = ({ ...props }) => <MuiInput {...props} />;

const InputPercentage: React.FC<Props> = ({
  unFixedDecimalScale = false,
  name,
  value,
  max,
  onChange,
  ...props
}) => {
  const handleChange = (values: any) => {
    const { floatValue } = values;
    const returnValue = floatValue ? floatValue : floatValue === 0 ? 0 : null;
    onChange(name, returnValue);
  };

  const isAllow = ({ floatValue }: any) => !max || !floatValue || floatValue <= max;

  return (
    <CurrencyFormat
      customInput={customInput}
      thousandSeparator
      fixedDecimalScale={!unFixedDecimalScale}
      decimalScale={2}
      onValueChange={handleChange}
      suffix="%"
      isAllowed={isAllow}
      {...props}
      name={name}
      value={typeof value === 'string' ? value : MoneyInputDetect(value)}
    />
  );
};

type Props = Omit<CurrencyFormat.Props, 'InputProps'> & { InputProps?: MuiInputProps } & {
  unFixedDecimalScale?: boolean;
  value: number;
  name: string;
  max?: string | number;
  onChange: Callback;
};

export default InputPercentage;
