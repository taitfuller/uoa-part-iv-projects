import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import ProjectDetails from "./ProjectDetails";

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
}));

function Row({ project, i, swapFavourites, removeFavourite, length }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${i >= 5 ? classes.lowRank : ""}`}
        hover
      >
        <TableCell align="center" className={classes.rankingColumn}>
          {i === 0 ? (
            <IconButton disabled>
              <KeyboardArrowUpIcon />
            </IconButton>
          ) : (
            <Tooltip title="Increase">
              <IconButton onClick={() => swapFavourites(i, i - 1)}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          )}
          {i === length - 1 ? (
            <IconButton disabled>
              <KeyboardArrowDownIcon />
            </IconButton>
          ) : (
            <Tooltip title="Decrease">
              <IconButton onClick={() => swapFavourites(i, i + 1)}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
        <TableCell className={classes.cursor} onClick={() => setOpen(!open)}>
          <Grid container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
              <Avatar className={i < 5 ? classes.blue : ""}>
                {project.id}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">{project.title}</Typography>
            </Grid>
            <Grid item className={classes.right}>
              {project.allocated ? (
                <Chip label="Allocated" className={classes.red} />
              ) : (
                <Chip label="Unallocated" />
              )}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell className={classes.buttonColumn}>
          <Tooltip title="Show More">
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton onClick={() => removeFavourite(project.id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <ProjectDetails
                project={project}
                isFavourite={true}
                toggleFavourite={() => removeFavourite(project.id)}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function RankProjects({ projects, favourites, setFavourites }) {
  const favouritesIndexes = new Map();
  Array.from(favourites).forEach((id, i) => favouritesIndexes.set(id, i));
  const filteredProjects = projects
    .filter((project) => favourites.has(project.id))
    .sort((a, b) => favouritesIndexes.get(a.id) - favouritesIndexes.get(b.id));

  const swapFavourites = (indexA, indexB) => {
    const update = Array.from(favourites);
    const temp = update[indexA];
    update[indexA] = update[indexB];
    update[indexB] = temp;
    setFavourites(new Set(update));
  };

  const removeFavourite = (id) => {
    const update = new Set(favourites);
    update.delete(id);
    setFavourites(update);
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.buttonColumn}>
              Rank
            </TableCell>
            <TableCell colSpan="2">Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProjects.map((project, i) => (
            <Row
              key={project.id}
              project={project}
              i={i}
              swapFavourites={swapFavourites}
              removeFavourite={removeFavourite}
              length={filteredProjects.length}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
