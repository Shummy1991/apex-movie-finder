import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
// usually I'm prefer styled components, but for now I used css because Material UI
import './index.css';
import Page from './Page';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Page />
    </ThemeProvider>
  </React.StrictMode>
);

