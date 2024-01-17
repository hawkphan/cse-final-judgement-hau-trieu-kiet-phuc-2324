/* eslint-disable @typescript-eslint/no-explicit-any */

import { Stack } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox, isEmpty } from '../..';


type Props = {
  fieldName: string;
  options: Array<any>;
  columns?: number;
};

const CustomTableCheckbox: React.FC<Props> = ({ fieldName, options, columns = 5 }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const handleChangeValue = (name: string, value: string[]) => {
    const validValue = value.filter((x) => x);
    if (isEmpty(validValue)) query.delete(name);
    else query.set(name, validValue.toString());
    return navigate({
      search: query.toString(),
    });
  };

  return (
    <Stack>
      <Checkbox.Group
        options={options}
        onChange={handleChangeValue}
        name={fieldName}
        columns={columns}
        value={query.get(fieldName)?.split(',') || []}
      />
    </Stack>
  );
};

export default CustomTableCheckbox;
