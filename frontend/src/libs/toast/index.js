import React, { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const snackbar = useSnackbar();

  const toast = {
    success: (message) => snackbar.enqueueSnackbar(message, { variant: 'success' }),
    error: (message) => snackbar.enqueueSnackbar(message, { variant: 'error' }),
    info: (message) => snackbar.enqueueSnackbar(message, { variant: 'info' }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);