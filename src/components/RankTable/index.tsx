import React from "react";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from "@mui/material";

import { Project } from "../../types";
import Row from "./Row";
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
}

const RankTable: React.VFC<RankTableProps> = ({
  projects,
  userFavourites,
  toggleFavourite,
  swapFavourites,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.buttonColumn}>
              Rank
            </TableCell>
            <TableCell colSpan={2}>Project</TableCell>
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
