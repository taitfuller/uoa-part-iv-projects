import React from "react";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import {
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
  Theme,
  Tooltip,
} from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Project } from "../../types";
import Row from "./Row";
import { useLeaveGroupDialog } from "../../hooks/dialog";
import { red } from "@mui/material/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface RankTableProps {
  projects: Project[];
  userFavourites: Set<Project["id"]>;
  toggleFavourite: (id: Project["id"]) => void;
  swapFavourites: (a: number, b: number) => void;
  isGroup?: boolean;
  userCount?: number;
  copyAccessCode?: () => void;
}

const RankTable: React.VFC<RankTableProps> = ({
  projects,
  userFavourites,
  toggleFavourite,
  swapFavourites,
  isGroup,
  userCount,
  copyAccessCode,
}) => {
  const handleLeaveGroup = useLeaveGroupDialog();

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
                {isGroup && (
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
                        title={`${userCount} Member${
                          userCount ?? 0 > 1 ? "s" : ""
                        }`}
                      >
                        <Chip icon={<VisibilityIcon />} label={userCount} />
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Leave Group">
                        <IconButton onClick={handleLeaveGroup}>
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
};

export default RankTable;
