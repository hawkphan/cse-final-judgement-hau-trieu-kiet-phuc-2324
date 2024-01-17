/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  Grow,
  IconButton,
  Dialog as MuiDialog,
} from '@mui/material';
import cn from 'classnames';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Typo, View } from '..';
import { REASON_CLOSE_DIALOG } from './helpers';
import './styles.scss';
import { COLOR_CODE, isEmpty } from '../../..';

const Dialog: React.FC<
  Omit<DialogProps, 'onClose'> & {
    iconTitle?: React.ReactNode;
    title: string;
    dialogActions?: React.ReactNode;
    dialogContentClasses?: DialogContentProps['classes'];
    fullScreen?: boolean;
    loading?: boolean;
    overflowVisible?: boolean;
    disabledButton?: boolean;
    hideTitle?: boolean;
    showDivider?: boolean;
    onClose?: (..._args: any[]) => void;
    titleFontWeight?: number;
  }
> = ({
  iconTitle,
  children,
  title,
  dialogActions,
  fullScreen,
  loading,
  overflowVisible,
  disabledButton,
  hideTitle,
  open,
  showDivider,
  onClose,
  maxWidth,
  titleFontWeight = 600,
  ...dialogProps
}) => (
  <MuiDialog
    open={open}
    {...dialogProps}
    fullScreen={fullScreen}
    maxWidth={maxWidth}
    classes={{
      paper: cn('cmp-dialog', `cmp-dialog__size-${maxWidth}`, {
        'cmp-dialog__content--visible': overflowVisible,
      }),
      container: 'cmp-dialog__container',
    }}
    TransitionComponent={Grow}
    BackdropProps={{
      transitionDuration: 0.4,
    }}
    onClose={(_e, reason) => {
      if (reason === REASON_CLOSE_DIALOG.ESCAPE_KEY_DOWN) {
        onClose({}, reason);
      }
    }}
    {...dialogProps}
  >
    {!disabledButton && (
      <IconButton
        className="cmp-dialog__close-icon"
        onClick={() => {
          onClose({}, REASON_CLOSE_DIALOG.CLOSE_ICON_CLICK);
        }}
      >
        <IoClose color={COLOR_CODE.PRIMARY_400} />
      </IconButton>
    )}
    {!hideTitle && (
      <DialogTitle className="cmp-dialog__title">
        <View isRow align="center" justify="space-between">
          <View isRow align="center">
            {iconTitle && <i className="mr-8">{iconTitle}</i>}
            <Typo variant="h4" mr={1} fontWeight={titleFontWeight}>
              {isEmpty(title) ? ' ' : title}
            </Typo>
            {loading && <CircularProgress size={25} />}
          </View>
        </View>
      </DialogTitle>
    )}
    <DialogContent
      classes={{
        root: cn('cmp-dialog__content', {
          'cmp-dialog__content--visible': overflowVisible,
        }),
      }}
      dividers={showDivider}
    >
      {children}
    </DialogContent>
    {!isEmpty(dialogActions) && (
      <DialogActions
        classes={{
          root: 'cmp-dialog__footer',
        }}
      >
        {dialogActions}
      </DialogActions>
    )}
  </MuiDialog>
);

export default Dialog;
