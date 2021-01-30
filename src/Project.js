import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import FavouriteButton from "./FavouriteButton";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(4),
  },
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
  list: {
    marginTop: 0,
  },
}));

export default function Project({ project, isFavourite, toggleFavourite }) {
  // const [toggled, setToggled] = useState(true)

  const classes = useStyles();

  // Render the UI for your table
  return (
    <Paper className={classes.paper}>
      <div className={classes.section}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Avatar className={classes.blue}>{project.id}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">{project.title}</Typography>
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
      <div className={classes.section}>
        <Typography variant="overline">Description</Typography>
        {project.description.map((description) => (
          <Typography paragraph>{description}</Typography>
        ))}
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="overline">Outcomes</Typography>

        <ul className={classes.list}>
          {project.outcomes.map((outcome) => (
            <li>
              <Typography>{outcome}</Typography>
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
              {project.supervisors.map((supervisor) => (
                <Grid item>
                  <Chip label={supervisor} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {project.cosupervisors.length > 0 && (
            <Grid item>
              <Typography variant="overline">Co-Supervisor</Typography>
              <Grid container spacing={1} direction="row">
                {project.cosupervisors.map((cosupervisor) => (
                  <Grid item>
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
              {project.categories.map((category) => (
                <Grid item>
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
              {project.specialisations.map((specialisation) => (
                <Grid item>
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
          <Button href={project.url}>Go to Official Page</Button>
        </Grid>
      </div>
    </Paper>
  );
}
