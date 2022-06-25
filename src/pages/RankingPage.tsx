import React from "react";

import {
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
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

  const favouritesIndexes = new Map();
  Array.from(favourites).forEach((id, i) => favouritesIndexes.set(id, i));
  const filteredProjects = projects
    .filter((project) => favourites.has(project.id))
    .sort((a, b) => favouritesIndexes.get(a.id) - favouritesIndexes.get(b.id));

  if (filteredProjects.length === 0) {
    return (
      <Container style={{ marginTop: 80 }}>
        <Grid container direction="column" alignItems="center" spacing={6}>
          <Grid item>
            <Typography variant="h4">
              You don&apos;t have any favourite projects&nbsp;
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: 60, marginBottom: -15 }}
              />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              You can favourite projects by clicking{" "}
              <FavoriteBorderIcon
                style={{ marginBottom: -10 }}
                fontSize="large"
              />{" "}
              on the Explore page
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              variant="contained"
              size="large"
              to="/explore"
            >
              Explore Projects
            </Button>
          </Grid>
          {isGroup && (
            <Grid item>
              <Tooltip title="Leave Group">
                <IconButton onClick={handleLeaveGroup}>
                  <DirectionsRunIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
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
        projects={filteredProjects}
        userFavourites={userFavourites}
        toggleFavourite={toggleFavourite}
        swapFavourites={swapFavourites}
        isGroup={isGroup}
        userCount={userCount}
        copyAccessCode={copyAccessCode}
      />
    </Container>
  );
};

export default RankingPage;
