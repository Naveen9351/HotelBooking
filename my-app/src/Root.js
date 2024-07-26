import React from 'react';
import { ThemeProvider } from './theme/useTheme';
import App from './App';

const Root = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default Root;
