import React from "react";

import { Alert, Box, Button, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";

import RankTable from "../components/RankTable";
import { Project } from "../types";
import { useProjects } from "../context/Projects";
import { useFavourites } from "../context/Favourites";
import { useGroup } from "../context/Group";
import { useLeaveGroupDialog } from "../hooks/dialog";
import { useCopyAccessCode } from "../hooks/copy";

interface RankingPageProps {
  isGroup?: boolean;
}

const RankingPage: React.VFC<RankingPageProps> = ({ isGroup }) => {
  const { projects } = useProjects();
  const {
    userFavourites,
    groupFavourites,
    toggleFavourite,
    swapUserFavourites,
    swapGroupFavourites,
  } = useFavourites();
  const { userCount } = useGroup();
  const handleLeaveGroup = useLeaveGroupDialog();
  const copyAccessCode = useCopyAccessCode();

  const [showRankMessage, setShowRankMessage] = useLocalStorage(
    "showRankMessage",
    "true"
  );

  const favourites: Set<Project["id"]> =
    isGroup && groupFavourites ? groupFavourites : userFavourites;
  const swapFavourites = isGroup ? swapGroupFavourites : swapUserFavourites;

  const favouritesIndexes = [...favourites].reduce(
    (favouritesIndexes, id, i) => favouritesIndexes.set(id, i),
    new Map<Project["id"], number>()
  );
  const favouriteProjects = projects
    .filter((project) => favourites.has(project.id))
    .sort(
      (a, b) =>
        (favouritesIndexes.get(a.id) ?? 0) - (favouritesIndexes.get(b.id) ?? 0)
    );

  if (favouriteProjects.length === 0)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 6,
          mt: 10,
        }}
      >
        <Typography variant="h4">
          You don&apos;t have any favourite projects&nbsp;
          <SentimentVeryDissatisfiedIcon
            style={{ fontSize: 60, marginBottom: -15 }}
          />
        </Typography>
        <Typography variant="h6">
          You can favourite projects by clicking{" "}
          <FavoriteBorderIcon style={{ marginBottom: -10 }} fontSize="large" />{" "}
          on the Explore page
        </Typography>
        <Button component={Link} variant="contained" size="large" to="/explore">
          Explore Projects
        </Button>
        {isGroup && (
          <Button
            onClick={handleLeaveGroup}
            startIcon={<DirectionsRunIcon />}
            color="inherit"
          >
            Leave Group
          </Button>
        )}
      </Box>
    );

  return (
    <>
      {showRankMessage === "true" && (
        <Alert
          severity="info"
          onClose={() => setShowRankMessage("false")}
          style={{ marginBottom: 30 }}
        >
          Your top 5 projects are highlighted
        </Alert>
      )}
      <RankTable
        projects={favouriteProjects}
        userFavourites={userFavourites}
        toggleFavourite={toggleFavourite}
        swapFavourites={swapFavourites}
        isGroup={isGroup}
        userCount={userCount}
        copyAccessCode={copyAccessCode}
      />
    </>
  );
};

export default RankingPage;
