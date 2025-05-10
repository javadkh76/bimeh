'use client';

import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { faIR } from '@mui/material/locale';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import stylisPluginRtl from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const cacheProviderConfig = {
  key: 'mui-rtl',
  stylisPlugins: [prefixer, stylisPluginRtl],
};

const theme = createTheme(
  {
    direction: 'rtl',
    typography: {
      fontFamily: 'inherit',
    },
    palette: {
      primary: {
        light: '#000',
        main: '#000',
        dark: '#000',
      },
      secondary: {
        light: '#ACACAC',
        main: '#ACACAC',
        dark: '#ACACAC',
      },
      error: {
        light: '#E61F10',
        main: '#E61F10',
        dark: '#E61F10',
      },
      text: {
        secondary: '#757575',
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            fontSize: 14,
            '&.Mui-error': {
              color: '#E61F10',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: '#757575',
            borderRadius: '0 !important',
            '& > .MuiOutlinedInput-notchedOutline': {
              borderColor: '#B4B4B4 !important',
            },
            '&.Mui-error > .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E61F10 !important',
            },
          },
          input: {
            padding: '13px 10px !important',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderColor: '#000000',
            '&.Mui-disabled': {
              color: 'rgba(0, 0, 0, 0.26)',
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
          root: {
            borderRadius: 0,
            padding: '11px 26px',
            boxShadow: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          container: {
            alignItems: 'flex-end',
            '& .MuiPaper-root': {
              width: '100%',
              margin: 0,
              borderRadius: 0,
            },
          },
          root: {
            alignItems: 'flex-end',
          },
        },
      },
    },
  },
  faIR
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={cacheProviderConfig}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
