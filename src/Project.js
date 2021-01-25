import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Avatar, Button, Chip, Divider, Grid, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import FavouriteButton from './FavouriteButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginBottom: theme.spacing(4),
    minWidth: 650,
    maxWidth: 950,
  },
  section: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
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
    marginLeft: 'auto',
  },
  list: {
    marginTop: 0,
  },
}));

export default function Project() {
  const classes = useStyles();

  // Render the UI for your table
  return (
    <Paper className={classes.paper}>
      <div className={classes.section}>
        <Grid container spacing={2} alignItems="center" wrap="nowrap">
          <Grid item>
            <Avatar className={classes.blue}>1</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">Using large screen displays to support understanding program code</Typography>
          </Grid>
          <Grid item className={classes.right}>
            <Chip label="Allocated" className={classes.red}/>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.section}>
        <Typography variant="overline">Description</Typography>
        <Typography>Trying to understand a large, unknown computer codebase is a challenging task. Currently, developers use Integrated Development Environments (IDEs) to navigate through a codebase whilst trying to connect different parts of the system together. Another approach would be to use people's spatial abilities to help with this process, but most computer screens are not large enough to display several code files simultaneously. This project will develop a huge screen viewer/editor that allows programmers to visualise multiple program files at the same time. It will use the large wall display in the centre for e-research to visualise the code."</Typography>
      </div>
      <Divider/>
      <div className={classes.section}>
        <Typography variant="overline">Outcomes</Typography>
        
        <ul className={classes.list}>
          <li><Typography>User study of how developers read code on large screens</Typography></li>
          <li><Typography>Development of a web-based system to display multiple code files on a huge-screen system</Typography></li>
          <li><Typography>Evaluation and analysis of the impact of using the system on code comprehension</Typography></li>
        </ul>
      </div>
      <Divider />
      <div className={classes.section}>
        <Grid container spacing={8}>
          <Grid item>
            <Typography variant="overline">Supervisor</Typography>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Chip label="Nasser Giacaman" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="overline">Co-Supervisor</Typography>
            <Grid container spacing={1} direction="row">
              <Grid item>
                <Chip label="Catherine Watson" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div className={classes.section}>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="overline">Topics</Typography>
              </Grid>
              <Grid item>
                <Chip label="Software Development Tools and Processes 1" />
              </Grid>
              <Grid item>
                <Chip label="Software Development Tools and Processes 2" />
              </Grid>
              <Grid item>
                <Chip label="Cool Stuff & That" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1} alignItems="flex-end">
              <Grid item>
                <Typography variant="overline">Specialisations</Typography>
              </Grid>
              <Grid item>
                <Chip label="Software Engineering" />
              </Grid>
              <Grid item>
                <Chip label="Electrical Sucks" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div className={classes.buttons}>
        <Grid container justify="space-between">
          <FavouriteButton />
          <Button>
            Go to Official Page
          </Button>
        </Grid>
      </div>
    </Paper>
  )
}