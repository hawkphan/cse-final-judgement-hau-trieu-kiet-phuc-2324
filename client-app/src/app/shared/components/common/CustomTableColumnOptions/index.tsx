import { COLOR_CODE } from '@common-config';
import { IconButton, Popover, Tooltip } from '@mui/material';
import React, { Attributes, PropsWithChildren } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const CustomTableColumnOptions: React.FC<PropsWithChildren> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

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
      <Tooltip title="Column Options" arrow placement="top">
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            backgroundColor: COLOR_CODE.BG_INPUT_DISABLED,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: COLOR_CODE.BG_SURFACE_HOVER,
            },
            p: '10px',
          }}
        >
          <MaterialSymbol icon="view_column" size={20} color={COLOR_CODE.GREY_800} />
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
              backgroundColor: COLOR_CODE.WHITE,
              marginTop: '4px',
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

export default CustomTableColumnOptions;
