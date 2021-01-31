import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./Header";
import ExploreProjects from "./ExploreProjects";
import RankProjects from "./RankProjects";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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

  const [favourites, setFavourites] = useState(
    () => new Set(JSON.parse(localStorage.getItem("favourites"))) || new Set()
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify([...favourites]));
  }, [favourites]);

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
            <Header />
            <main>
              <div className={classes.appBarSpacer} />
              <Container className={classes.container}>
                <Switch>
                  <Route path="/explore">
                    <ExploreProjects
                      data={data}
                      favourites={favourites}
                      setFavourites={setFavourites}
                    />
                  </Route>
                  <Route path="/rank">
                    <RankProjects
                      projects={data.projects}
                      favourites={favourites}
                      setFavourites={setFavourites}
                    />
                  </Route>
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
