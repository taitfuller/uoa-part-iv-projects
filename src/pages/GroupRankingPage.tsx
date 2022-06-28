import React from "react";

import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navigate } from "react-router-dom";

import { useGroup } from "../context/Group";
import { useFavourites } from "../context/Favourites";
import Loading from "../components/Loading";
import NoFavouritesMessage from "../components/NoFavouritesMessage";
import HideableAlert from "../components/HideableAlert";
import RankProjectList from "../components/RankProjectList";
import { useCopyAccessCode } from "../hooks/copy";
import { useLeaveGroupDialog } from "../hooks/dialog";
import { useFilterAndSortFavourites } from "../hooks/filter";

const GroupRankingPage: React.VFC = () => {
  const {
    userFavourites,
    groupFavourites,
    toggleFavourite,
    swapGroupFavourites,
  } = useFavourites();
  const { groupId, userId, groupHasLoaded, userCount } = useGroup();
  const handleLeaveGroup = useLeaveGroupDialog();
  const copyAccessCode = useCopyAccessCode();

  const favouriteProjects = useFilterAndSortFavourites(groupFavourites);

  if (!groupId || !userId) return <Navigate to="/group-ranking/join" replace />;

  if (!groupHasLoaded) return <Loading message="Loading Group Data..." />;

  if (favouriteProjects.length === 0) return <NoFavouritesMessage />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      <HideableAlert
        localStorageKey="hideRankMessage"
        message="Your top 5 projects are highlighted"
      />
      <RankProjectList
        projects={favouriteProjects}
        favourites={userFavourites}
        toggleFavourite={toggleFavourite}
        swapFavourites={swapGroupFavourites}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Tooltip title="Copy Access Code">
          <IconButton onClick={copyAccessCode}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`${userCount} Member${userCount ?? 0 > 1 ? "s" : ""}`}>
          <Chip icon={<VisibilityIcon />} label={userCount} />
        </Tooltip>
        <Tooltip title="Leave Group">
          <IconButton onClick={handleLeaveGroup}>
            <DirectionsRunIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default GroupRankingPage;
