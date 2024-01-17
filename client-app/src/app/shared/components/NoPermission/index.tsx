

import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLOR_CODE } from '../../common';
import LockedPage from './LockedPage';
import './styles.scss';
import { PATHS } from '../../../configs/paths';
import { Button, Typo, View } from '..';

const NoPermission: React.FC<Props> = ({
  title = `You don't have permission to view this document`,
  buttonTitle = 'Go to Main Menu',
  buttonLink = PATHS.root,
}) => {
  return (
    <View flexGrow={1} justify="center" align="center" className="my-32">
      <Box>
        <LockedPage />
      </Box>
      <Typo variant="h5" my={3} color={COLOR_CODE.PRIMARY_700} textAlign={'center'}>
        {title}
      </Typo>
      <Link to={buttonLink}>
        <Button>{buttonTitle}</Button>
      </Link>
    </View>
  );
};

type Props = {
  title?: string;
  buttonTitle?: string;
  buttonLink?: string;
};

export default NoPermission;
