// Buffer polyfill must run first (before App/store load algosdk)
import './polyfills/buffer.js';

import '@mui/material/styles/defaultTheme';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { Provider } from 'react-redux';
import store from './app/store.js';

// Ensure MUI theme module is loaded before any MUI component (fixes Vite pre-bundle init order)
const theme = createTheme({
  palette: {
    primary: { main: '#0EB56F' },
  },
});

// Unregister any leftover CRA service worker in dev (it intercepts fetches and breaks Vite)
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister());
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
