import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00838f',
    },
    secondary: {
      main: '#00e676',
    },
  },
};
export const theme = createTheme(themeOptions);
