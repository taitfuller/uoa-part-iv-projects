import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Avatar, Chip, Divider, Grid, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import ProjectDetails from "./ProjectDetails";
import { Project } from "../types";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  bold: {
    fontWeight: "bold",
  },
}));

interface ProjectCardProps {
  project: Project;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const ProjectCard: React.VFC<ProjectCardProps> = ({
  project,
  isFavourite,
  toggleFavourite,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.section}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Avatar className={classes.blue}>{project.id}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.bold}>
              {project.title}
            </Typography>
          </Grid>
          <Grid item className={classes.right}>
            {project.allocated ? (
              <Chip label="Allocated" className={classes.red} />
            ) : (
              <Chip label="Unallocated" />
            )}
          </Grid>
        </Grid>
      </div>
      <Divider />
      <ProjectDetails
        project={project}
        isFavourite={isFavourite}
        toggleFavourite={toggleFavourite}
      />
    </Paper>
  );
};

export default ProjectCard;
