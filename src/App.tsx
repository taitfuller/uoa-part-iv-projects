import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";
import { useGroup } from "./context/Group";
import { useProjects } from "./context/Projects";
import { SnackbarProvider } from "./context/Snackbar";
import { DialogProvider } from "./context/Dialog";

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

const App: React.FC = () => {
  const { isLoading } = useProjects();
  const { groupId, userId } = useGroup();

  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
      <DialogProvider>
        <SnackbarProvider>
          {isLoading ? (
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
            <>
              <Header />
              <main>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                  <Switch>
                    <Route path="/explore">
                      <ExplorePage />
                    </Route>
                    <Route path="/my-ranking">
                      <RankingPage />
                    </Route>
                    <Route path="/group-ranking">
                      {(!groupId || !userId) && <Redirect to="/join-group" />}
                      <GroupRankingPage />
                    </Route>
                    <Route path="/join-group">
                      <JoinGroupPage />
                    </Route>
                    <Route path="/">
                      <Redirect to="/explore" />
                    </Route>
                  </Switch>
                </Container>
              </main>
            </>
          )}
        </SnackbarProvider>
      </DialogProvider>
    </BrowserRouter>
  );
};

export default App;
