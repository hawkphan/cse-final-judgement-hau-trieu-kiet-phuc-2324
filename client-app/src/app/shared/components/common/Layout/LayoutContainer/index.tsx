import { isEmpty } from '@common-utils';
import { Typo } from '@components';
import { Box, Breakpoint, Container, SxProps } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';

const LayoutRoot: FC<Props> = ({
  hasContainer = true,
  title,
  titleVariant = 'h2',
  maxWidthCtn = 'xl',
  sx,
  children,
}) => {
  const childrenSection = useMemo(() => {
    return (
      <Box>
        {!isEmpty(title) && (
          <Typo variant={titleVariant} mb={2}>
            {title}
          </Typo>
        )}
        {children}
      </Box>
    );
  }, [children, titleVariant, title]);

  if (hasContainer) {
    return (
      <Box py={2} id="layout-root" sx={sx}>
        <Container maxWidth={maxWidthCtn}>{childrenSection}</Container>
      </Box>
    );
  }
  return (
    <Box py={2} id="layout-root" sx={sx}>
      {childrenSection}
    </Box>
  );
};

type Props = PropsWithChildren & {
  hasContainer?: boolean;
  maxWidthCtn?: Breakpoint;
  title?: string;
  sx?: SxProps;
  titleVariant?:
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
};

export default LayoutRoot;
