import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#38A35AFF',
      },
      secondary: {
        main: '#5CEE7BFF',
      },
    },
  });
