/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMediaQuery } from '@mui/material';
import { muiResponsive } from '..';

export enum ScreenSize {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

export default function useResponsive(size: ScreenSize): boolean {
  const getBreakpoint = (_size: ScreenSize) => {
    switch (size) {
      case ScreenSize.MOBILE:
        return muiResponsive.MOBILE;
      case ScreenSize.TABLET:
        return muiResponsive.TABLET;
      case ScreenSize.DESKTOP:
        return muiResponsive.LARGE_SCREEN;

      default:
        return muiResponsive.LARGE_SCREEN;
    }
  };
  const isMatch = useMediaQuery(getBreakpoint(size));
  return isMatch;
}

/**
 ** How to use:
 *
 * import {useResponsive} from 'src/hooks';
 *
 * const isMatch = useResponsive(ScreenSize.MOBILE);
 *
 * return(
 *  <h1>Mobile: {isMatch}</h1>
 * )
 */
