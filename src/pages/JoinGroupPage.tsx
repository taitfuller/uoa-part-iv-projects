import React, { useState } from "react";

import { Box } from "@mui/material";
import { useHistory } from "react-router";
import { useGroup } from "../context/Group";
import { useConnection } from "../context/Connection";
import { useSnackbar } from "../context/Snackbar";
import { useCopyAccessCode } from "../hooks/copy";
import ShareGroupCard from "../components/ShareGroupCard";
import CreateGroupCard from "../components/CreateGroupCard";
import JoinGroupCard from "../components/JoinGroupCard";

const JoinGroupPage: React.VFC = () => {
  const { createGroup, joinGroup, groupId, userId } = useGroup();
  const { connectGroup } = useConnection();
  const openSnackbar = useSnackbar();
  const copyAccessCode = useCopyAccessCode();

  const history = useHistory();

  const [accessCode, setAccessCode] = useState(groupId);

  const [loadingJoinGroup, setLoadingJoinGroup] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const handleJoinGroup = async () => {
    setLoadingJoinGroup(true);
    try {
      await joinGroup(accessCode);
      connectGroup();
    } catch (err) {
      openSnackbar((err as Error).message, "error");
    }
    setLoadingJoinGroup(false);
    history.replace("/group-ranking");
  };

  const handleCreateGroup = async () => {
    setLoadingCreateGroup(true);
    try {
      await createGroup();
    } catch (err) {
      openSnackbar((err as Error).message, "error");
    }
    setLoadingCreateGroup(false);
  };

  return (
    <Box
      sx={{ mt: 4, display: "flex", justifyContent: "center", columnGap: 4 }}
    >
      {userId && groupId ? (
        <ShareGroupCard
          groupId={groupId}
          history={history}
          copyAccessCode={copyAccessCode}
        />
      ) : (
        <>
          <JoinGroupCard
            disabled={accessCode === "" || loadingCreateGroup}
            loading={loadingJoinGroup}
            accessCode={accessCode}
            setAccessCode={setAccessCode}
            onJoinGroup={handleJoinGroup}
          />
          <CreateGroupCard
            disabled={loadingJoinGroup || loadingCreateGroup}
            loading={loadingCreateGroup}
            onCreateGroup={handleCreateGroup}
          />
        </>
      )}
    </Box>
  );
};

export default JoinGroupPage;
