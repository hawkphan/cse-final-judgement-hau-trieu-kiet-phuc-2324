/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import React, { useEffect, useMemo } from 'react';

import { Typo, View } from '..';
import Icon from '../Icon';
import './styles.scss';

const ValidatePassword: React.FC<Props> = ({ className, password, oldPassword = '', onChange }) => {
  const validateSchemas: Array<{
    message: string;
    isValid: (_value: string) => boolean;
  }> = useMemo(() => {
    const defaultValidate = [
      {
        message: 'Must have at least 8 characters',
        isValid: (password: string) => /.{8,}/.test(password),
      },
      {
        message: 'Must have at least 1 lowercase',
        isValid: (password: string) => /[a-z]/.test(password),
      },
      {
        message: 'Must have at least 1 uppercase',
        isValid: (password: string) => /[A-Z]/.test(password),
      },
      {
        message: 'Must have at least 1 number',
        isValid: (password: string) => /[0-9]/.test(password),
      },
      {
        message: 'Must have at least 1 special characters !, @, #, $, %, ^, &, or *',
        isValid: (password: string) => /.*[!@#$%^*&]/.test(password),
      },
    ];
    const oldPasswordCheck = oldPassword
      ? [
          {
            message: 'Must not be the same as current password',
            isValid: (password: string) => oldPassword !== password,
          },
        ]
      : [];
    return [...defaultValidate, ...oldPasswordCheck];
  }, [oldPassword]);

  useEffect(() => {
    if (onChange) {
      onChange(validateSchemas?.every((x) => x?.isValid(password)));
    }
    // eslint-disable-next-line
  }, [password]);

  const isShow = !!password;

  return (
    <View
      className={cn('cmp-validate-password', className, { 'cmp-validate-password--show': isShow })}
    >
      {validateSchemas.map((item, idx) => {
        const isValid = item?.isValid(password);
        return (
          <View
            key={`validate-password__item-${item.message}`}
            className={cn(
              'cmp-validate-password__item',
              { 'cmp-validate-password__item--valid': isValid },
              { 'cmp-validate-password__item--invalid': !isValid },
            )}
            isRowWrap
            align="center"
            justify="flex-start"
            style={{
              transitionDelay: `${idx * 0.04}s`,
            }}
          >
            <Icon name={isValid ? 'ic_check' : 'ic_close'} size={20} />
            <Typo ml={1}>{item.message}</Typo>
          </View>
        );
      })}
    </View>
  );
};

type Props = {
  className?: string;
  onChange?: (..._args: any[]) => void;
  password: string;
  oldPassword?: string;
};

export default ValidatePassword;
