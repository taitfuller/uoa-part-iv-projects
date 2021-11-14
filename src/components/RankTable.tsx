import React, { useState } from "react";

import { createStyles, makeStyles } from "@material-ui/core/styles";
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
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import VisibilityIcon from "@material-ui/icons/Visibility";

import ProjectDetails from "./ProjectDetails";
import { Project } from "../types";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme: Theme) => createStyles({
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
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
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

interface RowProps {
  project: Project
  i: number
  userFavourites: Set<Project["id"]>
  toggleFavourite: (id: Project["id"]) => void
  swapFavourites: (a: number, b: number) => void
  length: number
}

const Row: React.FC<RowProps> = ({
  project,
  i,
  userFavourites,
  toggleFavourite,
  swapFavourites,
  length,
}: RowProps) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow
        className={`${classes.root} ${i >= 5 ? classes.lowRank : ""}`}
        hover
      >
        <TableCell align="center">
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
          {userFavourites.has(project.id) && (
            <Tooltip title="Remove">
              <IconButton onClick={() => toggleFavourite(project.id)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <ProjectDetails
                project={project}
                isFavourite={userFavourites.has(project.id)}
                toggleFavourite={() => toggleFavourite(project.id)}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface RankTableProps {
  projects: Project[]
  userFavourites: Set<Project["id"]>
  toggleFavourite: (id: Project["id"]) => void
  swapFavourites: (a: number, b: number) => void
  setShowLeaveGroupDialog?: (show: boolean) => void
  isGroup?: boolean
  userCount?: number
  copyAccessCode?: () => void
}

const RankTable: React.FC<RankTableProps>  = ({
  projects,
  userFavourites,
  toggleFavourite,
  swapFavourites,
  setShowLeaveGroupDialog,
  isGroup,
  userCount,
  copyAccessCode,
}: RankTableProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.buttonColumn}>
              Rank
            </TableCell>
            <TableCell colSpan={2}>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs>
                  Project
                </Grid>
                {isGroup && userCount && setShowLeaveGroupDialog && (
                  <React.Fragment>
                    <Grid item>
                      <Tooltip title="Copy Access Code">
                        <IconButton onClick={copyAccessCode}>
                          <FileCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip
                        title={`${userCount} Member${userCount > 1 ? "s" : ""}`}
                      >
                        <Chip icon={<VisibilityIcon />} label={userCount} />
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Leave Group">
                        <IconButton onClick={() => setShowLeaveGroupDialog(true)}>
                          <DirectionsRunIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, i) => (
            <Row
              key={project.id}
              project={project}
              i={i}
              userFavourites={userFavourites}
              toggleFavourite={toggleFavourite}
              swapFavourites={swapFavourites}
              length={projects.length}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RankTable;
