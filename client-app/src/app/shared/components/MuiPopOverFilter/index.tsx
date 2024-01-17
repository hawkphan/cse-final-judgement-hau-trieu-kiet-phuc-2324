/* eslint-disable @typescript-eslint/no-explicit-any */

import { Popover } from '@mui/material';
import cn from 'classnames';
import React from 'react';

import { Button, View } from '../common';
import './styles.scss';
import { emptyFunction } from '../..';

const MuiPopOverFilter: React.FC<Props> = ({
  label,
  body,
  onShow = emptyFunction,
  mini,
  isShow = true,
  labelClassName,
  anchorOrigin,
  transformOrigin,
  icon,
  height = 40,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    onShow(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
    onShow(false);
  };

  const open = Boolean(anchorEl) && isShow;
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="link-primary"
        className={cn('cmp-popover__button', labelClassName)}
        {...(icon && {
          icon,
        })}
        style={{ height }}
      >
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOrigin?.vertical || 'bottom',
          horizontal: anchorOrigin?.horizontal || 'left',
        }}
        transformOrigin={{
          vertical: transformOrigin?.vertical || 'top',
          horizontal: transformOrigin?.horizontal || 'right',
        }}
        classes={{
          paper: 'px-0',
        }}
        className={cn('cmp-popover', { 'is-mini': mini })}
        style={{ borderRadius: '8px !important' }}
      >
        <View
          className=""
          style={{ maxWidth: 380 }}
          onClick={(event) => {
            event.stopPropagation();
            handleClose(event);
          }}
        >
          {body}
        </View>
      </Popover>
    </>
  );
};

type PositionVerticalType = number | 'bottom' | 'top' | 'center';
type PositionHorizontalType = number | 'center' | 'left' | 'right';

type PopoverPosition = {
  vertical: PositionVerticalType;
  horizontal: PositionHorizontalType;
};

type Props = {
  label: string | React.ReactNode;
  labelClassName?: string;
  body: React.ReactNode;
  onShow?: (..._args: any[]) => void;
  mini?: boolean;
  isShow?: boolean;
  anchorOrigin?: PopoverPosition;
  transformOrigin?: PopoverPosition;
  icon?: React.ReactElement;
  height?: number;
};

export default MuiPopOverFilter;
