// app/providers/RootProvider.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StoreProvider from './StoreProvider';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), var(--font-montserrat), sans-serif',
  },
});

export const RootProvider = ({ children }: { children: ReactNode }) => (
  <StoreProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StoreProvider>
);