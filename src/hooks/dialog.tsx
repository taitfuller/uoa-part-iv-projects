import React, { useCallback } from "react";
import LeaveGroupDialog from "../components/LeaveGroupDialog";
import { useDialog } from "../context/Dialog";

export const useLeaveGroupDialog = () => {
  const { openDialog, handleClose: handleCloseDialog } = useDialog();

  return useCallback(
    () => openDialog(<LeaveGroupDialog onClose={handleCloseDialog} />),
    [handleCloseDialog, openDialog]
  );
};
