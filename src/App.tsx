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
import useLocalStorage from "react-use-localstorage";

import Header from "./components/Header";
import { Project } from "./types";
import ExplorePage from "./pages/ExplorePage";
import RankingPage from "./pages/RankingPage";
import GroupRankingPage from "./pages/GroupRankingPage";
import JoinGroupPage from "./pages/JoinGroupPage";
import { useProjects } from "./context/Projects";

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

async function postData(url = "") {
  const response = await fetch(url, {
    method: "POST",
  });
  return response.json();
}

let socket: WebSocket | undefined;

const App: React.FC = () => {
  const { isLoading } = useProjects();

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

  const [userCount, setUserCount] = useState(1);

  const [groupHasLoaded, setGroupHasLoaded] = useState(false);

  const [groupId, setGroupId] = useLocalStorage("groupId", "");

  const [userId, setUserId] = useLocalStorage("userId", "");

  const createGroup = async () => {
    try {
      const createGroupResponse = await postData(
        "https://p64bn61v3m.execute-api.ap-southeast-2.amazonaws.com/create-group"
      );
      if (createGroupResponse.groupId) {
        setGroupId(createGroupResponse.groupId);

        await joinGroup(createGroupResponse.groupId);

        return createGroupResponse.groupId;
      }
    } catch (_err) {
      throw new Error("Whoops! Something went wrong - give it another go?");
    }
  };

  const joinGroup = async (joinGroupId: string) => {
    try {
      const joinGroupResponse = await postData(
        `https://p64bn61v3m.execute-api.ap-southeast-2.amazonaws.com/join-group?groupId=${joinGroupId}`
      );
      if (joinGroupResponse.userId) {
        if (groupId !== joinGroupId) setGroupId(joinGroupId);
        setUserId(joinGroupResponse.userId);

        return joinGroupResponse.userId;
      }
    } catch (_err) {
      throw new Error("Whoops! Looks like you entered an invalid Access Code");
    }
  };

  const socketUpdateFavourites = (favourites: Set<Project["id"]>) => {
    const data = JSON.stringify({
      action: "updateUserFavourites",
      data: [...favourites],
    });
    socket?.send(data);
  };

  const connect = useCallback(
    (groupId: string, userId: string) => {
      socket = new WebSocket(
        `wss://bs4wohdona.execute-api.ap-southeast-2.amazonaws.com/production?groupId=${groupId}&userId=${userId}`
      );

      socket.onopen = () => {
        socketUpdateFavourites(favourites);
      };

      socket.onmessage = (event) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          if (data.favouritesList) {
            setGroupFavourites(new Set(data.favouritesList));
            if (!groupHasLoaded) {
              setGroupHasLoaded(true);
            }
          }
          if (data.userCount) {
            setUserCount(data.userCount);
          }
        }
      };

      socket.onclose = socket.onerror = () => {
        socket = undefined;
      };
    },
    [favourites, groupHasLoaded]
  );

  const disconnect = () => {
    if (socket) {
      socketUpdateFavourites(new Set());
      socket.close();
    }
    setGroupId("");
    setUserId("");
    socket = undefined;
    setShowLeaveGroupDialog(false);
  };

  const [showLeaveGroupDialog, setShowLeaveGroupDialog] = useState(false);

  useEffect(() => {
    if (!socket && groupId && userId) connect(groupId, userId);
  }, [connect, groupId, userId]);

  const toggleFavourite = (id: Project["id"]) => {
    const update = new Set(favourites);
    update.has(id) ? update.delete(id) : update.add(id);
    setFavourites(update);
    if (socket) {
      socketUpdateFavourites(update);
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
                    userCount={userCount}
                    groupHasLoaded={groupHasLoaded}
                    toggleFavourite={toggleFavourite}
                    swapGroupFavourites={swapGroupFavourites}
                    setShowLeaveGroupDialog={setShowLeaveGroupDialog}
                    copyAccessCode={copyAccessCode}
                  />
                </Route>
                <Route path="/join-group">
                  <JoinGroupPage
                    createGroup={createGroup}
                    joinGroup={joinGroup}
                    groupId={groupId}
                    userId={userId}
                    connect={connect}
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
          <Button onClick={disconnect} style={{ color: "red" }}>
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
