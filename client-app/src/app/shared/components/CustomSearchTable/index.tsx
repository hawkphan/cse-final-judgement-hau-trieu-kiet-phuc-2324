/* eslint-disable @typescript-eslint/no-explicit-any */

import { Clear } from '@mui/icons-material';
import { Box } from '@mui/material';
import { debounce } from 'lodash';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MuiInput } from '../common';
import { isEmpty } from '../..';

type Props = {
  label?: string;
  placeholder?: string;
  searchKey?: string;
  enableAutoFocus?: boolean;
};

enum _QUERY_KEY {
  _SEARCH = 'search',
}

const CustomSearchTable: React.FC<Props> = ({
  label = 'Search User Documents',
  placeholder = 'Search',
  searchKey = _QUERY_KEY._SEARCH,
  enableAutoFocus = false,
}) => {
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchText = query.get(searchKey) || '';
  const [searchValue, setSearchValue] = React.useState(searchText || '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (enableAutoFocus) {
      inputRef.current?.focus();
    }
  }, [enableAutoFocus]);

  const hasValue = !isEmpty(searchText);

  const handleTextChange = (event: { currentTarget: { value: any } }) => {
    const { value } = event.currentTarget;

    setSearchValue(value);
    debounceValue(value);
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    onSearch('');
  };

  const onSearch = (value: string) => {
    query.set(searchKey, value);
    history({ search: query.toString() });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = React.useCallback(debounce(onSearch, 300), []);

  return (
    <Box>
      <MuiInput
        label={label}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleTextChange}
        {...(hasValue && {
          iconComponent: <Clear />,
          onIconClick: handleClearSearchValue,
        })}
        inputRef={inputRef}
      />
    </Box>
  );
};

export default CustomSearchTable;
