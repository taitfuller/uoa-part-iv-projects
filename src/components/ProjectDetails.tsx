import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Chip, Divider, Grid, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import FavouriteButton from "./FavouriteButton";
import { Project } from "../types";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  list: {
    marginTop: 0,
  },
}));

interface ProjectDetailsProps {
  project: Project;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const ProjectDetails: React.VFC<ProjectDetailsProps> = ({
  project,
  isFavourite,
  toggleFavourite,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.section}>
        <Typography variant="overline">Description</Typography>
        {project.description.map((description, i) => (
          <Typography paragraph key={i}>
            {description}
          </Typography>
        ))}
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="overline">Outcomes</Typography>

        <ul className={classes.list}>
          {project.outcomes.map((outcome, i) => (
            <li key={i}>
              <Typography key={i}>{outcome}</Typography>
            </li>
          ))}
        </ul>
      </div>
      <Divider />
      <div className={classes.section}>
        <Grid container spacing={8}>
          <Grid item>
            <Typography variant="overline">Supervisor</Typography>
            <Grid container spacing={1} direction="column">
              {project.supervisors.map((supervisor, i) => (
                <Grid item key={i}>
                  <Chip label={supervisor} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {project.cosupervisors.length > 0 && (
            <Grid item>
              <Typography variant="overline">Co-Supervisor</Typography>
              <Grid container spacing={1} direction="row">
                {project.cosupervisors.map((cosupervisor, i) => (
                  <Grid item key={i}>
                    <Chip label={cosupervisor} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
      <Divider />
      <div className={classes.section}>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="overline">Categories</Typography>
              </Grid>
              {project.categories.map((category, i) => (
                <Grid item key={i}>
                  <Chip label={category} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item>
                <Typography variant="overline">Specialisations</Typography>
              </Grid>
              {project.specialisations.map((specialisation, i) => (
                <Grid item key={i}>
                  <Chip label={specialisation} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div className={classes.buttons}>
        <Grid container justify="space-between">
          <FavouriteButton active={isFavourite} toggle={toggleFavourite} />
          <Button href={project.url} target="_blank">
            Go to Official Page
          </Button>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
