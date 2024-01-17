import { COLOR_CODE } from '@common-config';
import { TypographyProps } from '@mui/material';
import React from 'react';
import { Typo } from '../..';

const TypographyLink: React.FC<Props> = ({
  variant = 'body2',
  children,
  className,
  sx,
  ...props
}) => (
  <Typo
    variant={variant}
    color={COLOR_CODE.INFO}
    sx={{
      ...sx,
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    }}
    {...(className && {
      classes: {
        root: className,
      },
    })}
    {...props}
  >
    {children}
  </Typo>
);

type Props = TypographyProps & {
  children: any;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'inherit';
  className?: string;
};

export default TypographyLink;
