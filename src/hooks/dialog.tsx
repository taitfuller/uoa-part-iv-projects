import React, { useCallback } from "react";

import { useDialog } from "../context/Dialog";
import LeaveGroupDialog from "../components/LeaveGroupDialog";

export const useLeaveGroupDialog = () => {
  const { openDialog, handleClose: handleCloseDialog } = useDialog();

  return useCallback(
    () => openDialog(<LeaveGroupDialog onClose={handleCloseDialog} />),
    [handleCloseDialog, openDialog]
  );
};
