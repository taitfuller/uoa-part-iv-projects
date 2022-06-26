import React from "react";

import {
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import GroupCard from "./GroupCard";

interface JoinGroupCardProps {
  disabled: boolean;
  loading: boolean;
  accessCode: string;
  setAccessCode: (accessCode: string) => void;
  onJoinGroup: () => Promise<void>;
}

const JoinGroupCard: React.VFC<JoinGroupCardProps> = ({
  disabled,
  loading,
  accessCode,
  setAccessCode,
  onJoinGroup,
}) => (
  <GroupCard>
    <Typography variant="h6">Join Group</Typography>
    <Typography>Enter your partner&#39;s Access Code:</Typography>
    <Paper sx={{ display: "flex" }} elevation={3}>
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Access Code"
        value={accessCode}
        onChange={(event) => setAccessCode(event.target.value.toUpperCase())}
      />
      {loading ? (
        <CircularProgress sx={{ p: 1 }} />
      ) : (
        <IconButton
          onClick={onJoinGroup}
          sx={{ p: 1 }}
          disabled={disabled}
          size="large"
        >
          <AddIcon />
        </IconButton>
      )}
    </Paper>
  </GroupCard>
);

export default JoinGroupCard;
