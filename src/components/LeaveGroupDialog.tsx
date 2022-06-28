import React, { useCallback } from "react";

import { Button, DialogActions, DialogTitle } from "@mui/material";

import { useConnection } from "../context/Connection";

interface LeaveGroupDialogProps {
  onClose: () => void;
}

const LeaveGroupDialog: React.FC<LeaveGroupDialogProps> = ({ onClose }) => {
  const { disconnectGroup } = useConnection();

  const leaveGroup = useCallback(() => {
    disconnectGroup();
    onClose();
  }, [disconnectGroup, onClose]);

  return (
    <>
      <DialogTitle>Are you sure you want to leave this group?</DialogTitle>
      <DialogActions>
        <Button onClick={leaveGroup} style={{ color: "red" }}>
          Leave Group
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </>
  );
};

export default LeaveGroupDialog;
