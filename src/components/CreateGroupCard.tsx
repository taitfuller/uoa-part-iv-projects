import React from "react";

import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import GroupCard from "./GroupCard";

interface CreateGroupCardProps {
  disabled: boolean;
  loading: boolean;
  onCreateGroup: () => Promise<void>;
}

const CreateGroupCard: React.VFC<CreateGroupCardProps> = ({
  disabled,
  loading,
  onCreateGroup,
}) => (
  <GroupCard>
    <Typography variant="h6">Create Group</Typography>
    <Typography>Don&apos;t have an Access Code?</Typography>
    <LoadingButton
      variant="contained"
      disabled={disabled}
      loading={loading}
      onClick={onCreateGroup}
    >
      Create Group
    </LoadingButton>
  </GroupCard>
);

export default CreateGroupCard;
