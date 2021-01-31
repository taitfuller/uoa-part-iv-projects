import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nav: {
    color: theme.palette.getContrastText(theme.palette.info.dark),
    backgroundColor: theme.palette.info.dark,
  },
  fullHeightTabs: {
    ...theme.mixins.toolbar,
  },
}));

export default function Header() {
  const classes = useStyles();

  const centerNav = useMediaQuery("(min-width:780px)");

  return (
    <AppBar className={classes.nav}>
      <Toolbar>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs>
            <Typography variant="h6">2021 Part IV Projects</Typography>
          </Grid>
          <Grid item>
            <Route
              path="/"
              render={({ location }) => (
                <Tabs
                  value={location.pathname}
                  className={classes.fullHeightTabs}
                >
                  <Tab
                    label="Explore"
                    className={classes.fullHeightTabs}
                    component={Link}
                    to="/explore"
                    value="/explore"
                  />
                  <Tab
                    label="Rank"
                    className={classes.fullHeightTabs}
                    component={Link}
                    to="/rank"
                    value="/rank"
                  />
                </Tabs>
              )}
            />
          </Grid>
          {centerNav && <Grid item xs />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
