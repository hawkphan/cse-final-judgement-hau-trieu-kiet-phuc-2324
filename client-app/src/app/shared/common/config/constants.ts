import { Accept } from 'react-dropzone';

export const ONE_HOUR = 60 * 60 * 1000;

export const COMMON_TYPE: Accept = {
  'image/png': ['.png'],
  'image/jpg': ['.jpg'],
  'image/jpeg': ['.jpeg'],
  'image/webp': ['.webp'],
  'application/pdf': ['.pdf'],
  'application/docx': ['.docx'],
};

export const muiResponsive = {
  MOBILE: '(max-width:600px)',
  TABLET: '(max-width:960px)',
  LARGE_SCREEN: '(max-width:1200px)',
  EXTRA_LARGE_SCREEN: '(max-width:1440px)',
};

export const GLOBAL_STYLE = {
  NAVBAR_HEIGHT: '68px',
  NAVBAR_MONITOR_HEIGHT: '100px',
  SIDE_BAR_WIDTH: '264px',
  SIDE_BAR_COLLAPSED_WIDTH: '80px',
};

export enum BOOLEAN {
  true = 'true',
  false = 'false',
}

export enum DIALOG_SIZE {
  LARGE = 'lg',
  MEDIUM = 'md',
  SMALL = 'sm',
  EXTRA_SMALL = 'xs',
  EXTREME_LARGE = 'xl',
}

export const NO_OPENER = 'noopener noreferrer';
export const PARAMS_SPLITTER = ';';

export const EMPTY_ID = '00000000-0000-0000-0000-000000000000';
