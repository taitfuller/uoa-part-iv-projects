import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Chip,
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

const useStyles = makeStyles((theme) => ({
  rankingColumn: {
    width: "128px",
  },
  cancelColumn: {
    width: "64px",
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
}));

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.rankingColumn}>
              Rank
            </TableCell>
            <TableCell colspan="2">Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProjects.map((project, i) => (
            <TableRow key={i} className={i >= 5 ? classes.lowRank : ""}>
              <TableCell align="center" className={classes.rankingColumn}>
                <Tooltip title="Increase">
                  <IconButton
                    disabled={i === 0}
                    onClick={() => swapFavourites(i, i - 1)}
                  >
                    <KeyboardArrowUpIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Decrease">
                  <IconButton
                    disabled={i === filteredProjects.length - 1}
                    onClick={() => swapFavourites(i, i + 1)}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Avatar className={classes.blue}>{project.id}</Avatar>
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
              <TableCell className={classes.cancelColumn}>
                <Tooltip title="Remove">
                  <IconButton onClick={() => removeFavourite(project.id)}>
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
