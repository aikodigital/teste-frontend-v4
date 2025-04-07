import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Paleta de cores harmoniosa
const colors = {
  primary: {
    main: '#002b52',
    light: '#4791db',
    dark: '#115293',
    contrastText: '#fff',
  },
  secondary: {
    main: '#38b48b',
    light: '#62c7a0',
    dark: '#267d61',
    contrastText: '#fff',
  },
  error: {
    main: '#e53935',
    light: '#ea5f5d',
    dark: '#a02725',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffa726',
    light: '#ffc061',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#29b6f6',
    light: '#4fc3f7',
    dark: '#0288d1',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  success: {
    main: '#2ecc71',
    light: '#6edca4',
    dark: '#208e4e',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  stateColors: {
    operating: '#2ecc71',
    stopped: '#f1c40f',
    maintenance: '#e74c3c',
  },
};

// Definições de tipografia com hierarquia clara
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.00714em',
  },
  button: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
};

// Definições de sombras sutis
const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(0,0,0,0.03), 0px 1px 3px 0px rgba(0,0,0,0.05)',
  '0px 3px 3px -2px rgba(0,0,0,0.05), 0px 2px 6px 0px rgba(0,0,0,0.03), 0px 1px 8px 0px rgba(0,0,0,0.05)',
  '0px 3px 5px -1px rgba(0,0,0,0.05), 0px 5px 8px 0px rgba(0,0,0,0.03), 0px 1px 14px 0px rgba(0,0,0,0.05)',
  '0px 4px 5px -2px rgba(0,0,0,0.05), 0px 7px 10px 1px rgba(0,0,0,0.03), 0px 2px 16px 1px rgba(0,0,0,0.05)',
  '0px 5px 5px -3px rgba(0,0,0,0.05), 0px 8px 10px 1px rgba(0,0,0,0.03), 0px 3px 14px 2px rgba(0,0,0,0.05)',
  '0px 5px 6px -3px rgba(0,0,0,0.05), 0px 9px 12px 1px rgba(0,0,0,0.03), 0px 3px 16px 2px rgba(0,0,0,0.05)',
  '0px 6px 6px -3px rgba(0,0,0,0.05), 0px 10px 14px 1px rgba(0,0,0,0.03), 0px 4px 18px 3px rgba(0,0,0,0.05)',
  '0px 6px 7px -4px rgba(0,0,0,0.05), 0px 11px 15px 1px rgba(0,0,0,0.03), 0px 4px 20px 3px rgba(0,0,0,0.05)',
  '0px 7px 8px -4px rgba(0,0,0,0.05), 0px 12px 17px 2px rgba(0,0,0,0.03), 0px 5px 22px 4px rgba(0,0,0,0.05)',
  '0px 7px 8px -4px rgba(0,0,0,0.05), 0px 13px 19px 2px rgba(0,0,0,0.03), 0px 5px 24px 4px rgba(0,0,0,0.05)',
  '0px 7px 9px -4px rgba(0,0,0,0.05), 0px 14px 21px 2px rgba(0,0,0,0.03), 0px 5px 26px 4px rgba(0,0,0,0.05)',
  '0px 8px 9px -5px rgba(0,0,0,0.05), 0px 15px 22px 2px rgba(0,0,0,0.03), 0px 6px 28px 5px rgba(0,0,0,0.05)',
  '0px 8px 10px -5px rgba(0,0,0,0.05), 0px 16px 24px 2px rgba(0,0,0,0.03), 0px 6px 30px 5px rgba(0,0,0,0.05)',
  '0px 8px 11px -5px rgba(0,0,0,0.05), 0px 17px 26px 2px rgba(0,0,0,0.03), 0px 6px 32px 5px rgba(0,0,0,0.05)',
  '0px 9px 11px -5px rgba(0,0,0,0.05), 0px 18px 28px 2px rgba(0,0,0,0.03), 0px 7px 34px 6px rgba(0,0,0,0.05)',
  '0px 9px 12px -6px rgba(0,0,0,0.05), 0px 19px 29px 2px rgba(0,0,0,0.03), 0px 7px 36px 6px rgba(0,0,0,0.05)',
  '0px 10px 13px -6px rgba(0,0,0,0.05), 0px 20px 31px 3px rgba(0,0,0,0.03), 0px 8px 38px 7px rgba(0,0,0,0.05)',
  '0px 10px 13px -6px rgba(0,0,0,0.05), 0px 21px 33px 3px rgba(0,0,0,0.03), 0px 8px 40px 7px rgba(0,0,0,0.05)',
  '0px 10px 14px -6px rgba(0,0,0,0.05), 0px 22px 35px 3px rgba(0,0,0,0.03), 0px 8px 42px 7px rgba(0,0,0,0.05)',
  '0px 11px 14px -7px rgba(0,0,0,0.05), 0px 23px 36px 3px rgba(0,0,0,0.03), 0px 9px 44px 8px rgba(0,0,0,0.05)',
  '0px 11px 15px -7px rgba(0,0,0,0.05), 0px 24px 38px 3px rgba(0,0,0,0.03), 0px 9px 46px 8px rgba(0,0,0,0.05)',
];

// Sombras para o tema escuro
const darkShadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 2px 6px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2), 0px 11px 15px 1px rgba(0,0,0,0.14), 0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 13px 19px 2px rgba(0,0,0,0.14), 0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2), 0px 14px 21px 2px rgba(0,0,0,0.14), 0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2), 0px 15px 22px 2px rgba(0,0,0,0.14), 0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2), 0px 17px 26px 2px rgba(0,0,0,0.14), 0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2), 0px 18px 28px 2px rgba(0,0,0,0.14), 0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2), 0px 19px 29px 2px rgba(0,0,0,0.14), 0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 21px 33px 3px rgba(0,0,0,0.14), 0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2), 0px 22px 35px 3px rgba(0,0,0,0.14), 0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2), 0px 23px 36px 3px rgba(0,0,0,0.14), 0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
];

// Sistema de espaçamento consistente
const spacing = 8;

// Temas para modo claro e escuro
const getThemeOptions = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Modo claro (padrão)
          primary: colors.primary,
          secondary: colors.secondary,
          error: colors.error,
          warning: colors.warning,
          info: colors.info,
          success: colors.success,
          grey: colors.grey,
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          // Modo escuro
          primary: {
            main: '#90caf9',
            light: '#a6d5fa',
            dark: '#648dae',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          secondary: {
            main: '#4cceac',
            light: '#70d8be',
            dark: '#359078',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          error: colors.error,
          warning: colors.warning,
          info: colors.info,
          success: colors.success,
          grey: colors.grey,
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        }),
  },
  typography,
  shadows: mode === 'light' ? shadows : darkShadows,
  spacing,
  shape: {
    borderRadius: 8,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
      easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 0.6, 1)',
      sharp: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 300,
      standard: 400,
      complex: 500,
      enteringScreen: 300,
      leavingScreen: 250,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1,
          },
          
          '&:hover': {
            boxShadow: mode === 'light' ? shadows[3] : darkShadows[3],
            transform: 'translateY(-4px) scale(1.01)',
            
            '&::before': {
              left: '100%',
            },
          },
          '&:active': {
            transform: 'translateY(-1px)',
            transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          },
        },
        contained: {
          boxShadow: mode === 'light' ? shadows[1] : darkShadows[1],
          '&:hover': {
            boxShadow: `0 8px 16px rgba(0,0,0,0.1), 0 4px 8px ${mode === 'light' ? 'rgba(25, 118, 210, 0.15)' : 'rgba(144, 202, 249, 0.15)'}`,
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.12)',
            borderColor: mode === 'light' ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.15)',
            boxShadow: `0 6px 16px ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'}`,
            backgroundColor: mode === 'light' 
              ? 'rgba(25, 118, 210, 0.08)' 
              : 'rgba(144, 202, 249, 0.08)',
          },
          '&:active': {
            transform: 'translateY(-1px) scale(0.96)',
            transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: mode === 'light' ? shadows[1] : darkShadows[1],
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            boxShadow: `${mode === 'light' ? shadows[3] : darkShadows[3]}, 0 0 0 1px ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'}`,
          },
        },
        elevation1: {
          boxShadow: mode === 'light' ? shadows[1] : darkShadows[1],
        },
        elevation2: {
          boxShadow: mode === 'light' ? shadows[2] : darkShadows[2],
        },
        elevation3: {
          boxShadow: mode === 'light' ? shadows[3] : darkShadows[3],
        },
        elevation4: {
          boxShadow: mode === 'light' ? shadows[4] : darkShadows[4],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: mode === 'light' ? shadows[1] : darkShadows[1],
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            boxShadow: `0 14px 28px ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'}, 
                       0 10px 10px ${mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.15)'}, 
                       0 0 0 1px ${mode === 'light' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(144, 202, 249, 0.1)'}`,
            transform: 'translateY(-8px) scale(1.01)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: spacing * 2.5,
          '&:last-child': {
            paddingBottom: spacing * 2.5,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 10,
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.15)',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.25)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
            transition: '0.15s',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? colors.primary.main : '#90caf9',
            borderWidth: 2,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
        },
        head: {
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)',
          fontWeight: 600,
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' ? shadows[1] : darkShadows[1],
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          color: mode === 'light' ? '#fff' : '#121212',
          borderRadius: 6,
          padding: '8px 12px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.03)',
            boxShadow: `0 4px 12px ${mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.3)'}, 
                       0 0 0 1px ${mode === 'light' ? 'rgba(25, 118, 210, 0.15)' : 'rgba(144, 202, 249, 0.15)'}`,
          },
          '&:active': {
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: mode === 'light' ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)',
          }
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: '16px 24px',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-thumb': {
            transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              borderRadius: '50%',
              boxShadow: '0 0 0 rgba(25, 118, 210, 0)',
              transition: 'box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }
          },
          '&:hover .MuiSwitch-thumb': {
            transform: 'scale(1.1)',
            '&:before': {
              boxShadow: '0 0 8px rgba(25, 118, 210, 0.4)',
            }
          },
          '& .MuiSwitch-track': {
            transition: 'background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'translateX(5px)',
            background: `linear-gradient(90deg, 
              ${mode === 'light' ? 'rgba(25, 118, 210, 0.03)' : 'rgba(144, 202, 249, 0.03)'}, 
              ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'}
            )`,
            boxShadow: `inset 2px 0 0 ${mode === 'light' ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)'}`,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'translateX(5px)',
            backgroundColor: mode === 'light' 
              ? 'rgba(25, 118, 210, 0.08)'
              : 'rgba(144, 202, 249, 0.12)',
            background: `linear-gradient(90deg, 
              ${mode === 'light' ? 'rgba(25, 118, 210, 0.03)' : 'rgba(144, 202, 249, 0.03)'}, 
              ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'}
            )`,
            boxShadow: `inset 2px 0 0 ${mode === 'light' ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)'}`,
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        },
      },
    },
  },
});

// Estado inicial do tema (modo claro por padrão)
const defaultMode = 'light';
const initialTheme = createTheme(getThemeOptions(defaultMode));

// Cria o tema responsivo
let theme = responsiveFontSizes(initialTheme);

// Função para alternar entre temas (será exportada)
export const getThemedComponents = (mode) => {
  return responsiveFontSizes(createTheme(getThemeOptions(mode)));
};

export default theme;

// Exportar cores como constantes para uso em outros componentes
export const COLORS = colors; 