import { Box, Stack } from '@mui/material';
import { Callback } from '@redux/types';
import React from 'react';
import { Button, Typo } from '../common';

const Refetch: React.FC<Props> = ({
  isLoading,
  onClick,
  title = 'Fail to fetch data, try to get data again',
  buttonTitle = 'Refetch',
}) => (
  <Stack flexDirection="row" justifyContent="center">
    <Box>
      <Typo mb={1}>{title}</Typo>
      <Stack flexDirection="row" justifyContent="center">
        <Button onClick={onClick} isLoading={isLoading} disabled={isLoading}>
          {buttonTitle}
        </Button>
      </Stack>
    </Box>
  </Stack>
);

type Props = {
  isLoading: boolean;
  onClick: Callback;
  title?: string;
  buttonTitle?: string;
};

export default Refetch;
