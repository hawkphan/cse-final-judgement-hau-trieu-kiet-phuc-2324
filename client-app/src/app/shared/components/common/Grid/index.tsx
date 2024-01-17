/* eslint-disable react-refresh/only-export-components */
import { Grid, GridProps } from '@mui/material';
import cn from 'classnames';
import { PropsWithChildren } from 'react';
import './styles.scss';

const Wrap: React.FC<PropsWithChildren<GridProps> & { renderIf?: boolean }> = ({
  children,
  className,
  renderIf = true,
  spacing = 2.5,
  ...props
}) => {
  if (!renderIf) return null;

  return (
    <Grid
      className={cn(className, 'py-8')}
      {...props}
      container
      spacing={spacing}
      columns={{ xs: 6, sm: 6, md: 12 }}
    >
      {children}
    </Grid>
  );
};

const Item: React.FC<PropsWithChildren<GridProps> & { renderIf?: boolean }> = ({
  children,
  className,
  renderIf = true,
  xs = 6,
  ...props
}) => {
  if (!renderIf) return null;

  const isEmpty = !children;
  return (
    <Grid className={cn({ 'cmp-grid__item--empty': isEmpty }, className)} {...props} item xs={xs}>
      {children}
    </Grid>
  );
};

export default {
  Wrap,
  Item,
};
