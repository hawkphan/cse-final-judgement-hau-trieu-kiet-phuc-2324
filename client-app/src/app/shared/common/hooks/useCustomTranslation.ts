/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isEmpty } from '..';

/**
 *
 * const {trans, enableLocale, i18n} = useCustomTranslation();
 * <Typography>
 *  {trans('key')}
 * </Typography>
 *
 */
function useCustomTranslation() {
  const i18n = useTranslation();
  const enableLocale = useSelector((state: any) => state.locale.enabled);
  const trans = (key: string | ReactNode): string | ReactNode => {
    if (isEmpty(key)) return key;

    if (enableLocale && typeof key === 'string') {
      return i18n.t(key);
    }
    return key;
  };

  return {
    i18n,
    trans,
    enableLocale,
    Trans,
  };
}

export default useCustomTranslation;
