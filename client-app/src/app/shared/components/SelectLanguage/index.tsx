import { Button, Menu, MenuItem } from '@mui/material';
import { useGetLanguages, useGetLocaleLanguage, useGetLocales } from '@queries';
import { ENGLISH_CODE } from '@queries/Locale/helpers';
import cn from 'classnames';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { IoCaretDownOutline } from 'react-icons/io5';
import { COLOR_CODE, LanguageService, useClickOutside } from '../../common';

type Props = {
  bgcolor?: string;
};

const SelectLanguage: FC<Props> = ({ bgcolor }) => {
  const { languages, isFetching } = useGetLanguages();
  const { locales } = useGetLocales();
  const { onGetLocaleLanguage } = useGetLocaleLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ref = useRef();

  useClickOutside(ref, () => {
    handleClose();
  });

  const formattedLanguages = useMemo(() => {
    if (!languages) return [];
    return languages.filter((language) => language.isEnabled);
  }, [languages]);

  const currentLanguage = useMemo(() => {
    const locale = LanguageService.getLocale();
    return locale.code;
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = useCallback(
    (value: string) => {
      const locale = locales[value] || locales[ENGLISH_CODE];

      LanguageService.setLocale(locale);
      onGetLocaleLanguage({ code: locale.code });
      handleClose();
    },
    [locales, onGetLocaleLanguage],
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        endIcon={<IoCaretDownOutline size={14} />}
        color="inherit"
        className={cn('', {
          active: open,
        })}
        sx={{
          bgcolor,

          '&.MuiButton-root.active, &.active.MuiButton-root:hover': {
            bgcolor: `${COLOR_CODE.GREY_200}`,
          },
        }}
        ref={ref}
        disabled={isFetching}
      >
        {currentLanguage?.toUpperCase() || ENGLISH_CODE.toString()}
      </Button>
      <Menu elevation={2} anchorEl={anchorEl} open={open} onClose={handleClose}>
        {formattedLanguages.map((language) => {
          return (
            <MenuItem
              onClick={() => handleChangeLanguage(language.code)}
              disableRipple
              key={language.id}
              selected={currentLanguage === language.code}
              sx={{
                fontSize: 14,
                '&.Mui-selected': {
                  bgcolor: COLOR_CODE.PRIMARY,
                  color: COLOR_CODE.WHITE,
                },
                '&.MuiMenuItem-root:hover': {
                  bgcolor: COLOR_CODE.PRIMARY_400,
                  color: COLOR_CODE.WHITE,
                },
              }}
            >
              {language.name} {language.description ? `(${language.description})` : ''}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default SelectLanguage;
