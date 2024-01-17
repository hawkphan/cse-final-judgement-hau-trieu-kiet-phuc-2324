
import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import React, { Attributes, PropsWithChildren } from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { useSearchParams } from 'react-router-dom';
import { COLOR_CODE } from '../..';

type Props = {
  filterParamsKeys?: string[];
};

const CustomTableFilterContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  filterParamsKeys = [],
}) => {
  const [query] = useSearchParams();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const isHasFilterParams = filterParamsKeys.some((s) => query.has(s));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'custom-table-filter-popover' : undefined;

  return (
    <>
      <Tooltip title="Filter" arrow placement="top">
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            color: COLOR_CODE.GREY_800,
            backgroundColor: COLOR_CODE.BG_INPUT_DISABLED,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: COLOR_CODE.BG_SURFACE_HOVER,
            },
            p: '10px',
          }}
        >
          <Badge variant="dot" color="error" invisible={!isHasFilterParams}>
            <MaterialSymbol icon="filter_list" size={20} color={COLOR_CODE.GREY_800} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'white',
              borderRadius: '16px',
              marginTop: '4px',
              boxShadow:
                '0px 2px 4px -1px rgba(0, 0, 0, 0.20), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
            },
          },
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              handleClosePopup: handleClose,
            } as Attributes);
          }
          return child;
        })}
      </Popover>
    </>
  );
};

export default CustomTableFilterContainer;
