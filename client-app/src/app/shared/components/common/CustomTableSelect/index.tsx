import { MuiSelect } from '@components';
import { Stack } from '@mui/material';
import { SelectOption } from '@queries';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  fieldName: string;
  options: Array<SelectOption>;
  marginLeft?: number;
  label: string;
};

const CustomTableSelect: React.FC<Props> = ({ fieldName, options, marginLeft, label }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const handleChangeValue = (name: string, value: string) => {
    if (value) {
      query.set(fieldName, value);
    } else query.delete(fieldName);
    return navigate({
      search: query.toString(),
    });
  };

  return (
    <Stack flexGrow={1} ml={marginLeft}>
      <MuiSelect
        label={label}
        placeholder={label}
        options={options}
        name={fieldName}
        size="small"
        onChange={handleChangeValue}
        value={query.get(fieldName)}
      />
    </Stack>
  );
};

export default CustomTableSelect;
