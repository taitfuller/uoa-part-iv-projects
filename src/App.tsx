import React, { useState, useEffect, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { Project } from "./types";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";
import { useProjects } from "./context/Projects";
import { useGroup } from "./context/Group";
import hasOwnProperty from "./types/hasOwnProperty";

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
  const { socket, groupId, userId, connect, disconnect } = useGroup();

  const [favourites, setFavourites] = useState<Set<Project["id"]>>(
    () =>
      new Set(
        JSON.parse(
          localStorage.getItem("favourites") as string
        ) as Project["id"][]
      )
  );
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify([...favourites]));
  }, [favourites]);

  const [groupFavourites, setGroupFavourites] = useState<Set<Project["id"]>>(
    new Set()
  );

  const socketUpdateFavourites = useCallback(
    (socket: WebSocket, favourites: Set<Project["id"]>) => {
      const data = JSON.stringify({
        action: "updateUserFavourites",
        data: [...favourites],
      });
      socket.send(data);
    },
    []
  );

  const [showLeaveGroupDialog, setShowLeaveGroupDialog] = useState(false);

  const toggleFavourite = (id: Project["id"]) => {
    const update = new Set(favourites);
    update.has(id) ? update.delete(id) : update.add(id);
    setFavourites(update);
    if (socket) {
      socketUpdateFavourites(socket, update);
    }
  };

  const swapFavourites = (indexA: number, indexB: number) => {
    const update = [...favourites];
    const temp = update[indexA];
    update[indexA] = update[indexB];
    update[indexB] = temp;
    setFavourites(new Set(update));
  };

  const swapGroupFavourites = (indexA: number, indexB: number) => {
    const update = [...groupFavourites];
    const valueA = update[indexA];
    const valueB = update[indexB];
    update[indexA] = valueB;
    update[indexB] = valueA;
    setGroupFavourites(new Set(update));
    const data = {
      action: "updateGroupFavourites",
      data: {
        a: {
          index: indexA,
          value: valueA,
        },
        b: {
          index: indexB,
          value: valueB,
        },
      },
    };
    socket?.send(JSON.stringify(data));
  };

  const [showCopied, setShowCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const copyAccessCode = () => {
    navigator.clipboard
      .writeText(groupId)
      .then(() => setShowCopied(true))
      .catch((err) => setErrorMessage(err.message));
  };

  const connectGroup = useCallback(() => {
    const onOpen = (socket: WebSocket) => {
      socketUpdateFavourites(socket, favourites);
    };

    const onMessage = (data: unknown) => {
      if (
        data &&
        typeof data === "object" &&
        hasOwnProperty(data, "favouritesList") &&
        Array.isArray(data.favouritesList)
      ) {
        setGroupFavourites(new Set(data.favouritesList));
      }
    };

    connect(onOpen, onMessage);
  }, [connect, favourites, socketUpdateFavourites]);

  const disconnectGroup = useCallback(() => {
    if (socket) {
      socketUpdateFavourites(socket, new Set());
    }
    disconnect();
    setShowLeaveGroupDialog(false);
  }, [disconnect, socket, socketUpdateFavourites]);

  useEffect(() => {
    if (!socket && groupId && userId) connectGroup();
  }, [connectGroup, groupId, socket, userId]);

  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
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
                  <ExplorePage
                    favourites={favourites}
                    toggleFavourite={toggleFavourite}
                  />
                </Route>
                <Route path="/my-ranking">
                  <RankingPage
                    userFavourites={favourites}
                    toggleFavourite={toggleFavourite}
                    swapFavourites={swapFavourites}
                  />
                </Route>
                <Route path="/group-ranking">
                  {(!groupId || !userId) && <Redirect to="/join-group" />}
                  <GroupRankingPage
                    userFavourites={favourites}
                    groupFavourites={groupFavourites}
                    toggleFavourite={toggleFavourite}
                    swapGroupFavourites={swapGroupFavourites}
                    setShowLeaveGroupDialog={setShowLeaveGroupDialog}
                    copyAccessCode={copyAccessCode}
                  />
                </Route>
                <Route path="/join-group">
                  <JoinGroupPage
                    connect={connectGroup}
                    setErrorMessage={setErrorMessage}
                    copyAccessCode={copyAccessCode}
                  />
                </Route>
                <Route path="/">
                  <Redirect to="/explore" />
                </Route>
              </Switch>
            </Container>
          </main>
        </>
      )}
      <Dialog
        open={showLeaveGroupDialog}
        onClose={() => setShowLeaveGroupDialog(false)}
      >
        <DialogTitle>Are you sure you want to leave this group?</DialogTitle>
        <DialogActions>
          <Button onClick={disconnectGroup} style={{ color: "red" }}>
            Leave Group
          </Button>
          <Button onClick={() => setShowLeaveGroupDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showCopied}
        autoHideDuration={3000}
        onClose={() => setShowCopied(false)}
      >
        <Alert onClose={() => setShowCopied(false)} severity="success">
          Access Code Copied!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
};

export default App;
