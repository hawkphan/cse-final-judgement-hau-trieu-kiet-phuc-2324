import { createTheme } from '@mui/material/styles';
import { COLOR_CODE } from './';

const defaultTheme = createTheme();

const { breakpoints } = defaultTheme;

const configTheme = createTheme({
  palette: {
    primary: {
      main: COLOR_CODE.PRIMARY,
      dark: COLOR_CODE.PRIMARY_DARK,
      light: COLOR_CODE.PRIMARY_LIGHT,
    },
    secondary: {
      main: COLOR_CODE.SECONDARY,
    },
    grey: {
      50: COLOR_CODE.PRIMARY_50,
      100: COLOR_CODE.PRIMARY_100,
      200: COLOR_CODE.PRIMARY_200,
      300: COLOR_CODE.PRIMARY_300,
      400: COLOR_CODE.PRIMARY_400,
      500: COLOR_CODE.PRIMARY_500,
      600: COLOR_CODE.PRIMARY_600,
      700: COLOR_CODE.PRIMARY_700,
      800: COLOR_CODE.PRIMARY_800,
      900: COLOR_CODE.PRIMARY_900,
    },
    success: {
      main: COLOR_CODE.SUCCESS,
    },
    warning: {
      main: COLOR_CODE.WARNING,
    },
    error: {
      main: COLOR_CODE.DANGER,
    },
    info: {
      main: COLOR_CODE.INFO,
    },
    text: {
      primary: COLOR_CODE.LABEL,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontSize: 16,
          pt: '8.5px',
          pb: '8.5px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          pt: '8.5px',
          pb: '8.5px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
        shrink: {
          transform: 'translate(14px, -9px) scale(0.9)',
          // backgroundColor: 'white',
          padding: 0,
        },
        asterisk: {
          fontSize: 16,
          color: COLOR_CODE.DANGER,
          fontWeight: 'bold',
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthMd: {
          maxWidth: '960px !important',
          '@media (min-width): 900px': {
            maxWidth: '960px !important',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#484C4F',
          fontSize: 14,
          padding: '8px 12px',
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
      styleOverrides: {
        h1: {
          fontSize: 40,
          fontWeight: 400,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 32,
          },
        },
        h2: {
          fontSize: 32,
          fontWeight: 400,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 26,
          },
        },
        h3: {
          fontSize: 26,
          fontWeight: 400,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 20,
          },
        },
        h4: {
          fontSize: 20,
          fontWeight: 400,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 18,
          },
        },
        h5: {
          fontSize: 18,
          fontWeight: 400,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 16,
          },
        },
        h6: {
          fontSize: 14,
          fontWeight: 500,
          color: COLOR_CODE.HEADER,
          [breakpoints.down('md')]: {
            fontSize: 14,
          },
        },
        body1: {
          fontSize: 16,
          color: COLOR_CODE.LABEL,
          [breakpoints.down('md')]: {
            fontSize: 16,
          },
        },
        body2: {
          fontSize: 14,
          color: COLOR_CODE.LABEL,
          [breakpoints.down('md')]: {
            fontSize: 14,
          },
        },
        subtitle1: {
          // type: small in Figma
          fontSize: 14,
          color: COLOR_CODE.LABEL,
          [breakpoints.down('md')]: {
            fontSize: 12,
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            color: COLOR_CODE.INFO,
          },
        },
      },
    },
  },
});

export const theme = configTheme;
