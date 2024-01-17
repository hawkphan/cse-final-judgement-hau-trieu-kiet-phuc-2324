/* eslint-disable @typescript-eslint/ban-types */

import { Typography, TypographyProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const Typo: FC<Props> = ({ children, ...props }) => {

  return <Typography {...props}>{children}</Typography>;
};

type Props = PropsWithChildren & TypographyProps & {};

export default Typo;
