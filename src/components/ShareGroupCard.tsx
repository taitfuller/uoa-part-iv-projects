import React, { useCallback } from "react";

import { Button, IconButton, Paper, Typography } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { History } from "history";

import GroupCard from "./GroupCard";

interface ShareGroupCardProps {
  groupId: string;
  history: History;
  copyAccessCode: () => void;
}

const ShareGroupCard: React.VFC<ShareGroupCardProps> = ({
  groupId,
  history,
  copyAccessCode,
}) => {
  const handleDone = useCallback(
    () => history.replace("/group-ranking"),
    [history]
  );

  return (
    <GroupCard>
      <Typography variant="h6">You&apos;re all set!</Typography>
      <Typography>Share this Access Code with your partner:</Typography>
      <Paper sx={{ display: "flex", alignItems: "center" }} elevation={3}>
        <Typography sx={{ mx: 4 }} id="access-code">
          {groupId}
        </Typography>
        <IconButton onClick={copyAccessCode} sx={{ ml: -1 }} size="large">
          <FileCopyIcon />
        </IconButton>
      </Paper>
      <Button onClick={handleDone} variant="contained">
        Done
      </Button>
    </GroupCard>
  );
};

export default ShareGroupCard;
