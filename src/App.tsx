import React from "react";
import { Container, styled } from "@mui/material";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";
import { useProjects } from "./context/Projects";
import Loading from "./components/Loading";

const HeaderOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

const App: React.VFC = () => {
  const { isLoading } = useProjects();

  return (
    <>
      <Header />
      <Container component="main" sx={{ minHeight: "100%", py: 4 }}>
        <HeaderOffset />
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
            <Route path="/group-ranking/join">
              <JoinGroupPage />
            </Route>
            <Route path="/group-ranking">
              <GroupRankingPage />
            </Route>
            <Route path="/">
              <Redirect to="/explore" />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
};

export default App;
