import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MuiInput } from '..';
import { MuiInputProps } from '../MuiInput';

const MuiInputPassword: React.FC<MuiInputProps> = ({ ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleEye = () => setHidden((prev: boolean) => !prev);
  const iconName = hidden ? (
    <AiFillEye onClick={toggleEye} size={24} className="cursor-pointer" />
  ) : (
    <AiFillEyeInvisible onClick={toggleEye} size={24} className="cursor-pointer" />
  );

  const inputType = hidden ? 'password' : 'text';
  return (
    <MuiInput
      InputProps={{
        endAdornment: iconName,
      }}
      type={inputType}
      {...props}
    />
  );
};

export default MuiInputPassword;
