import React from "react";

import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useGroup } from "../context/Group";
import Loading from "../components/Loading";
import { useLeaveGroupDialog } from "../hooks/dialog";
import { useFavourites } from "../context/Favourites";
import { useCopyAccessCode } from "../hooks/copy";
import NoFavouritesMessage from "../components/NoFavouritesMessage";
import RankTable from "../components/RankTable";
import HideableAlert from "../components/HideableAlert";
import { useFilterAndSortFavourites } from "../hooks/filter";

const RankGroup: React.VFC = () => {
  const { groupFavourites, toggleFavourite, swapGroupFavourites } =
    useFavourites();
  const { groupHasLoaded, userCount } = useGroup();
  const handleLeaveGroup = useLeaveGroupDialog();
  const copyAccessCode = useCopyAccessCode();

  const favouriteProjects = useFilterAndSortFavourites(groupFavourites);

  if (!groupHasLoaded) return <Loading message="Loading Group Data..." />;

  if (favouriteProjects.length === 0) return <NoFavouritesMessage />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      <HideableAlert
        localStorageKey="hideRankMessage"
        message="Your top 5 projects are highlighted"
      />
      <RankTable
        projects={favouriteProjects}
        userFavourites={groupFavourites}
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

export default RankGroup;
