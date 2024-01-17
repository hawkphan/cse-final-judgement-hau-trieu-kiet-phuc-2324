
import { Stack } from '@mui/material';
import React from 'react';
import './styles.scss';
import { IMAGES } from '../../../../../configs/images';
import { COLOR_CODE, Image, Typo } from '../../../..';

const EmptyTable: React.FC<Props> = ({ title = 'No records' }) => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} my={4}>
      <Image src={IMAGES.documentView} width="120" className="mb-8" />
      <Typo variant="h5" color={COLOR_CODE.PRIMARY_700} textAlign={'center'}>
        {title}
      </Typo>
    </Stack>
  );
};

type Props = {
  title?: string;
};

export default EmptyTable;
