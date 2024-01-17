import { COLOR_CODE } from '@common-config';
import { Box, SxProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const LayoutTableWrapper: FC<Props> = ({ children, sx }) => {
  return (
    <Box
      id="layout-table-wrapper"
      sx={{
        bgcolor: COLOR_CODE.WHITE,
        px: 2,
        py: 1,
        border: `${COLOR_CODE.SECTION_BORDER}`,
        borderRadius: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

type Props = PropsWithChildren & {
  sx?: SxProps;
};

export default LayoutTableWrapper;
