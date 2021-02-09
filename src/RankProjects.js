import React from "react";

import {
  Button,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";

import RankGroup from "./RankGroup";
import RankTable from "./RankTable";

export default function RankProjects({
  projects,
  favourites,
  setFavourites,
  showRankMessage,
  setRankMessage,
  rankView,
  setRankView,
  createGroup,
  isGroupOwner,
  enableGroupOwner,
  groupId,
  userId,
  socketConnected,
  connect,
}) {
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
      <Tabs
        value={rankView}
        onChange={(_event, newValue) => setRankView(newValue)}
        centered
      >
        <Tab label="Personal" />
        <Tab label="Group" />
      </Tabs>
      {rankView === 1 && !socketConnected ? (
        <RankGroup
          createGroup={createGroup}
          isGroupOwner={isGroupOwner}
          enableGroupOwner={enableGroupOwner}
          groupId={groupId}
          userId={userId}
          connect={connect}
        />
      ) : (
        <RankTable
          projects={projects}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      )}
    </Container>
  );
}
