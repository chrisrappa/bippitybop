import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material';
import { Provider as ReduxStateProvider } from 'react-redux';
import store from './store';
import { SnackbarProvider } from 'notistack';
import { ToastProvider } from './libs/toast';
import { StyledMaterialDesignContent } from './styled';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ReduxStateProvider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider 
          maxSnack={3}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
        >
          <ToastProvider>
            <App />
          </ToastProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ReduxStateProvider>
  </BrowserRouter>
);
