import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";

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

  const classes = useStyles();

  if (data.length === 0)
    return (
      <div>
        <CssBaseline />
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
      </div>
    );

  return (
    <div>
      <CssBaseline />
      <AppBar className={classes.nav}>
        <Toolbar>
          <Typography variant="h6">2021 Part IV Projects</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Projects data={data} />
        </Container>
      </main>
    </div>
  );
}

export default App;
