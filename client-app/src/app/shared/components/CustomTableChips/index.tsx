/* eslint-disable @typescript-eslint/no-explicit-any */

import { Chip, Stack } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from '../..';

type ChipType = {
  prefix?: string;
  fieldName: string;
  options?: Array<any>;
};

type ChipTypeRender = {
  label: string;
  fieldName: string;
  value: string;
};

type Props = {
  chipTypes: Array<ChipType>;
};

const CustomTableChips: React.FC<Props> = ({ chipTypes }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  const chipItems: ChipTypeRender[] = chipTypes.reduce((state, type) => {
    const { fieldName, options, prefix } = type;
    if (!query.has(fieldName)) return state;
    const typeValue: ChipTypeRender[] = (query.get(fieldName) ?? '').split(',').map((val) => {
      let label = val;
      if (options) {
        label = options.find((option) => option.value === val)?.label;
      }
      if (prefix) label = `${prefix}${label}`;
      return {
        fieldName,
        value: val,
        label,
      };
    });
    return [...state, ...typeValue];
  }, []);

  const handleDelete = (name: string, value: string) => {
    const settleValue = (query.get(name) ?? '').split(',').filter((val) => val !== value);

    if (!isEmpty(settleValue)) {
      query.set(name, settleValue.toString());
    } else query.delete(name);
    return navigate({
      search: query.toString(),
    });
  };

  return (
    <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap">
      {chipItems.map((item) => (
        <Chip
          label={item.label}
          onDelete={() => handleDelete(item.fieldName, item.value)}
          key={`${item.fieldName}-${item.value}`}
          variant="filled"
          sx={{
            fontSize: 14,
          }}
        />
      ))}
    </Stack>
  );
};

export default CustomTableChips;
