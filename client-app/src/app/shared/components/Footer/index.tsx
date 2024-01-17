
import { Box, Stack } from '@mui/material';
import React from 'react';
import { Typo } from '../..';
import configs from '../../../configs';

const Footer: React.FC = () => (
  <Box>
    <Box bgcolor="primary.main" py={1} borderTop="1px solid white">
      <Stack flexDirection="row" justifyContent="center" alignItems="center" my={1}>
        <Typo variant="body2" mr={3} color="white">
          © {new Date().getFullYear()} Lumisight Core
        </Typo>
        <Typo variant="body2" color="white">
          v{configs.APP_VERSION}
        </Typo>
      </Stack>
    </Box>
  </Box>
);

export default Footer;
