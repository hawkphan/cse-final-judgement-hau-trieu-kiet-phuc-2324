/* eslint-disable @typescript-eslint/no-explicit-any */

import { Clear, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack } from '@mui/material';

import { debounce } from 'lodash';
import React, { Ref, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { COLOR_CODE, MuiInput, isEmpty } from '../..';

const clsPrefix = 'custom-search-table';

type Props = {
  searchText?: string;
  searchKey?: string;
  pageKey?: string;
  placeholder?: string;
  ref?: Ref<HTMLDivElement>;
  onSearch?: (_text: string) => void;
  onInputTouch?: (..._args: any[]) => void;
};

const CustomTableSearch: React.FC<Props> = forwardRef(
  (
    {
      searchText,
      placeholder = 'Search',
      searchKey = 'search',
      pageKey = 'page',
      onSearch,
      onInputTouch,
    },
    ref,
  ) => {
    const { search } = useLocation();

    const query = new URLSearchParams(search);
    const searchParam = searchText || query.get(searchKey) || '';
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = React.useState(searchParam);
    const onSearchFunc = async (val: string) => {
      if (onSearch) return onSearch(val);

      if (val) query.set(searchKey, val);
      else query.delete(searchKey);

      query.delete(pageKey);

      navigate({ search: query.toString() });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceValue = React.useCallback(debounce(onSearchFunc, 500), [query]);

    const hasValue = !isEmpty(searchParam);

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const { value } = event.target;
      setSearchValue(value);
      debounceValue(value);
    };

    const handleClearSearchValue = () => {
      setSearchValue('');
      onSearchFunc('');
    };

    return (
      <Stack flexGrow={1}>
        <MuiInput
          // label="Search"
          placeholder={placeholder}
          size="small"
          value={searchValue}
          onChange={handleTextChange}
          onClick={onInputTouch}
          inputRef={ref}
          sx={{
            '& .MuiInputBase-root': { backgroundColor: COLOR_CODE.WHITE },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: hasValue && (
              <IconButton
                classes={{ root: `${clsPrefix}-icon p-2` }}
                onClick={handleClearSearchValue}
              >
                <Clear sx={{ fontSize: 20 }} />
              </IconButton>
            ),
          }}
        />
      </Stack>
    );
  },
);

export default CustomTableSearch;
