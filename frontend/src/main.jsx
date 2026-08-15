import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './redux/store.js';
import App from './App.jsx';
import { ThemeContextProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <CssBaseline />
        <App />
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);