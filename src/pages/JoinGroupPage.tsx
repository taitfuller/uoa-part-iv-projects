import React, { useCallback, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGroup } from "../context/Group";
import { useSnackbar } from "../context/Snackbar";
import ShareGroupCard from "../components/ShareGroupCard";
import CreateGroupCard from "../components/CreateGroupCard";
import JoinGroupCard from "../components/JoinGroupCard";
import { useCopyAccessCode } from "../hooks/copy";

const JoinGroupPage: React.FC = () => {
  const { createGroup, joinGroup, groupId, userId } = useGroup();
  const openSnackbar = useSnackbar();
  const copyAccessCode = useCopyAccessCode();

  const [accessCode, setAccessCode] = useState(groupId);

  const [loadingJoinGroup, setLoadingJoinGroup] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const isMobile = useMediaQuery("(max-width:740px)");

  const navigate = useNavigate();

  const handleJoinGroup = useCallback(async () => {
    setLoadingJoinGroup(true);
    try {
      await joinGroup(accessCode);
      navigate("/group-ranking", { replace: true });
    } catch (err) {
      setLoadingJoinGroup(false);
      openSnackbar((err as Error).message, "error");
    }
  }, [accessCode, joinGroup, navigate, openSnackbar]);

  const handleCreateGroup = useCallback(async () => {
    setLoadingCreateGroup(true);
    try {
      await createGroup();
    } catch (err) {
      openSnackbar((err as Error).message, "error");
    }
    setLoadingCreateGroup(false);
  }, [createGroup, openSnackbar]);

  const handleDone = useCallback(
    () => navigate("/group-ranking", { replace: true }),
    [navigate]
  );

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: isMobile ? "center" : "stretch",
        rowGap: 4,
        columnGap: 4,
      }}
    >
      {userId && groupId ? (
        <ShareGroupCard
          groupId={groupId}
          onDone={handleDone}
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
