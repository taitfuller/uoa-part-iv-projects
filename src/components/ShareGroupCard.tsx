import React from "react";

import { Button, IconButton, Paper, Typography } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import GroupCard from "./GroupCard";

interface ShareGroupCardProps {
  groupId: string;
  copyAccessCode: () => void;
  onDone: () => void;
}

const ShareGroupCard: React.VFC<ShareGroupCardProps> = ({
  groupId,
  copyAccessCode,
  onDone,
}) => (
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
    <Button onClick={onDone} variant="contained">
      Done
    </Button>
  </GroupCard>
);

export default ShareGroupCard;
