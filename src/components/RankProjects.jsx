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

import RankTable from "./RankTable";

export default function RankProjects({
  projects,
  userFavourites,
  toggleFavourite,
  swapFavourites,
  groupFavourites,
  userCount,
  showRankMessage,
  setRankMessage,
  setLeaveGroupDialog,
  isGroup,
  copyAccessCode,
}) {
  const favourites = isGroup ? groupFavourites : userFavourites;
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
              You don't have any favourite projects&nbsp;
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
                <IconButton onClick={() => setLeaveGroupDialog(true)}>
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
          onClose={() => setRankMessage(false)}
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
        setLeaveGroupDialog={setLeaveGroupDialog}
        isGroup={isGroup}
        userCount={userCount}
        copyAccessCode={copyAccessCode}
      />
    </Container>
  );
}
