import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from '@mui/material';
import { ReactNode } from 'react';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#00838f',
    },
    secondary: {
      main: '#00e676',
    },
  },
};
const theme = createTheme(themeOptions);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
