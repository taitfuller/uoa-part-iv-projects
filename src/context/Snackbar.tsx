import React, { createContext, useCallback, useContext, useState } from "react";
import { AlertColor, Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

type SnackbarContextType = (
  message: string,
  severity?: AlertColor,
  autoHideDuration?: number
) => void;

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

type SnackbarState = {
  isOpen: boolean;
  message?: string;
  severity?: AlertColor;
  autoHideDuration?: number;
};

export const SnackbarProvider: React.FC = ({ children }) => {
  const [{ isOpen, message, severity, autoHideDuration }, setState] =
    useState<SnackbarState>({ isOpen: false });

  const openSnackbar = useCallback(
    (message: string, severity: AlertColor = "info", autoHideDuration = 3000) =>
      setState({ isOpen: true, message, severity, autoHideDuration }),
    []
  );

  const handleClose = useCallback(
    () => setState((state) => ({ ...state, isOpen: false })),
    []
  );

  return (
    <SnackbarContext.Provider value={openSnackbar}>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const snackbarInstance = useContext(SnackbarContext);

  if (snackbarInstance === undefined) {
    throw new Error("useSnackbar() must be used within a SnackbarProvider");
  }

  return snackbarInstance;
};
