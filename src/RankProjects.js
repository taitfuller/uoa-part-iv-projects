import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ClearIcon from "@material-ui/icons/Clear";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";

import ProjectDetails from "./ProjectDetails";
import RankTable from "./RankTable";

const useStyles = makeStyles((theme) => ({
  container: {
    overflowX: "hidden",
  },
  buttonColumn: {
    width: "128px",
  },
  lowRank: {
    backgroundColor: "#eee",
  },
  blue: {
    color: theme.palette.getContrastText(theme.palette.info.dark),
    backgroundColor: theme.palette.info.dark,
  },
  right: {
    marginLeft: "auto",
  },
  cursor: {
    cursor: "pointer",
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  fullHeight: {
    height: "100%",
  },
  alertMessage: {
    marginBottom: theme.spacing(4),
  },
}));

export default function RankProjects({
  projects,
  favourites,
  setFavourites,
  showRankMessage,
  setRankMessage,
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
      <RankTable
        projects={projects}
        favourites={favourites}
        setFavourites={setFavourites}
      />
    </Container>
  );
}
