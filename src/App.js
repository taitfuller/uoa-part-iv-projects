import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";

import Projects from "./Projects";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  nav: {
    color: theme.palette.getContrastText(theme.palette.info.dark),
    backgroundColor: theme.palette.info.dark,
  },
  fullHeightTabs: {
    ...theme.mixins.toolbar,
  },
  appBarSpacer: theme.mixins.toolbar,
  fullHeight: {
    height: "100%",
  },
}));

function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(
      "https://uoa-part-iv-projects.s3-ap-southeast-2.amazonaws.com/projects.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const centerNav = useMediaQuery("(min-width:780px)");

  const classes = useStyles();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/explore" />
        <Route path="/rank" />
        <Route path="/">
          <Redirect to="/explore" />
        </Route>
      </Switch>
      <div>
        <CssBaseline />
        {data.length === 0 ? (
          <Container className={`${classes.container} ${classes.fullHeight}`}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={4}
              className={classes.fullHeight}
            >
              <Grid item>
                <CircularProgress size={50} />
              </Grid>
              <Grid item>
                <Typography variant="h4">Loading Projects...</Typography>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <div>
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
            <main>
              <div className={classes.appBarSpacer} />
              <Container className={classes.container}>
                <Switch>
                  <Route path="/explore">
                    <Projects data={data} />
                  </Route>
                  <Route path="/rank">Rank Projects</Route>
                </Switch>
              </Container>
            </main>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
