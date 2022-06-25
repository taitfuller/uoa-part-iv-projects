import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import { Container } from "@mui/material";

import Header from "./components/Header";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";
import { useGroup } from "./context/Group";
import { useProjects } from "./context/Projects";
import Loading from "./components/Loading";
import { Redirect, Route, Switch } from "react-router-dom";

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

const App: React.VFC = () => {
  const { isLoading } = useProjects();
  const { groupId, userId } = useGroup();

  const classes = useStyles();

  return (
    <>
      <Header />
      <main>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          {isLoading ? (
            <Loading message="Loading Projects..." />
          ) : (
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
          )}
        </Container>
      </main>
    </>
  );
};

export default App;
