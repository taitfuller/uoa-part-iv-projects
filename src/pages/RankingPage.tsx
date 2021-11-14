import React from "react";

import {
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";

import RankTable from "../components/RankTable";
import { Project } from "../types";

interface RankingPageProps {
  projects: Project[];
  userFavourites: Set<Project["id"]>;
  toggleFavourite: (id: Project["id"]) => void;
  swapFavourites: (a: number, b: number) => void;
  groupFavourites?: Set<Project["id"]>;
  userCount?: number;
  showRankMessage: boolean;
  setShowRankMessage: (show: boolean) => void;
  setShowLeaveGroupDialog?: (show: boolean) => void;
  isGroup?: boolean;
  copyAccessCode?: () => void;
}

const RankingPage: React.FC<RankingPageProps> = ({
  projects,
  userFavourites,
  toggleFavourite,
  swapFavourites,
  groupFavourites,
  userCount,
  showRankMessage,
  setShowRankMessage,
  setShowLeaveGroupDialog,
  isGroup,
  copyAccessCode,
}) => {
  const favourites: Set<Project["id"]> =
    isGroup && groupFavourites ? groupFavourites : userFavourites;
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
          {isGroup && setShowLeaveGroupDialog && (
            <Grid item>
              <Tooltip title="Leave Group">
                <IconButton onClick={() => setShowLeaveGroupDialog(true)}>
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
      {showRankMessage === true && (
        <Alert
          severity="info"
          onClose={() => setShowRankMessage(false)}
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
        setShowLeaveGroupDialog={setShowLeaveGroupDialog}
        isGroup={isGroup}
        userCount={userCount}
        copyAccessCode={copyAccessCode}
      />
    </Container>
  );
};

export default RankingPage;
