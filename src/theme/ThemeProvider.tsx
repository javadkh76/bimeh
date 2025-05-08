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
