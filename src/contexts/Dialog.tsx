import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Dialog } from "@mui/material";

type DialogContextType = {
  openDialog: (dialog: React.ReactNode) => void;
  handleClose: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type DialogState = {
  isOpen: boolean;
  dialog?: React.ReactNode;
};

export const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [{ isOpen, dialog }, setState] = useState<DialogState>({
    isOpen: false,
  });

  const openDialog = useCallback(
    (dialog: React.ReactNode) => setState({ isOpen: true, dialog }),
    []
  );

  const handleClose = useCallback(
    () => setState((state) => ({ ...state, isOpen: false })),
    []
  );

  const context = useMemo<DialogContextType>(
    () => ({ openDialog, handleClose }),
    [handleClose, openDialog]
  );

  return (
    <DialogContext.Provider value={context}>
      {children}
      <Dialog open={isOpen} onClose={handleClose}>
        {dialog}
      </Dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error("useDialog() must be used within a DialogProvider");
  }

  return context;
};
