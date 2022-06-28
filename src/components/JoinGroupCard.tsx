import React, { useCallback } from "react";

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

const JoinGroupCard: React.FC<JoinGroupCardProps> = ({
  disabled,
  loading,
  accessCode,
  setAccessCode,
  onJoinGroup,
}) => {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onJoinGroup();
    },
    [onJoinGroup]
  );

  return (
    <GroupCard>
      <Typography variant="h6">Join Group</Typography>
      <Typography>Enter your partner&#39;s Access Code:</Typography>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ display: "flex", alignItems: "center" }} elevation={3}>
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Access Code"
            value={accessCode}
            onChange={(event) =>
              setAccessCode(event.target.value.toUpperCase())
            }
          />
          {loading ? (
            <CircularProgress sx={{ m: 1.5 }} size={26} />
          ) : (
            <IconButton
              disabled={disabled}
              sx={{ m: 1 }}
              size="small"
              type="submit"
            >
              <AddIcon />
            </IconButton>
          )}
        </Paper>
      </form>
    </GroupCard>
  );
};

export default JoinGroupCard;
