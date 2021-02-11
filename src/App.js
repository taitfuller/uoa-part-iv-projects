import React, { useState, useRef, useEffect } from "react";

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
import RankGroup from "./RankGroup";
import RankProjects from "./RankProjects";

const useDidMount = () => {
  const didMountRef = useRef(true);

  useEffect(() => {
    didMountRef.current = false;
  }, []);
  return didMountRef.current;
};

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

let socket = null;

function App() {
  const didMount = useDidMount();

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

  const [favourites, setFavourites] = useState(
    () => new Set(JSON.parse(localStorage.getItem("favourites"))) || new Set()
  );
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify([...favourites]));
  }, [favourites]);

  const [groupFavourites, setGroupFavourites] = useState(new Set());

  const [groupHasLoaded, setGroupHasLoaded] = useState(false);

  const [groupId, setGroupId] = useState(localStorage.getItem("groupId") || "");
  useEffect(() => {
    localStorage.setItem("groupId", groupId);
  }, [groupId]);

  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  const [isGroupOwner, setIsGroupOwner] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);

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

  const joinGroup = async (joinGroupId) => {
    try {
      const joinGroupResponse = await postData(
        `https://p64bn61v3m.execute-api.ap-southeast-2.amazonaws.com/join-group?groupId=${joinGroupId}`
      );
      if (joinGroupResponse.userId) {
        if (groupId !== joinGroupId) setGroupId(joinGroupId);
        setUserId(joinGroupResponse.userId);

        return;
      }
    } catch (_err) {
      throw new Error("Whoops! Looks like you entered an invalid Access Code");
    }
  };

  const socketUpdateFavourites = (favourites) => {
    const data = JSON.stringify({
      action: "updateUserFavourites",
      data: [...favourites],
    });
    socket.send(data);
  };

  const connect = () => {
    setSocketConnected(true);

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
      }
    };

    socket.onclose = socket.onerror = () => {
      setSocketConnected(false);
      socket = null;
    };
  };

  const [showRankMessage, setRankMessage] = useState(() =>
    localStorage.getItem("showRankMessage") === null
      ? true
      : localStorage.getItem("showRankMessage")
  );

  useEffect(() => {
    localStorage.setItem("showRankMessage", showRankMessage);
  }, [showRankMessage]);

  useEffect(() => {
    if (didMount) {
      getData();
      if (!socket && !!groupId && !!userId) {
        connect();
      }
    }
  });

  const toggleFavourite = (id) => {
    const update = new Set(favourites);
    update.has(id) ? update.delete(id) : update.add(id);
    setFavourites(update);
    if (socket) {
      socketUpdateFavourites(update);
    }
  };

  const swapFavourites = (indexA, indexB) => {
    const update = [...favourites];
    const temp = update[indexA];
    update[indexA] = update[indexB];
    update[indexB] = temp;
    setFavourites(new Set(update));
  };

  const swapGroupFavourites = (indexA, indexB) => {
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
    socket.send(JSON.stringify(data));
  };

  const classes = useStyles();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/explore" />
        <Route path="/my-ranking" />
        <Route path="/group-ranking" />
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
                      toggleFavourite={toggleFavourite}
                    />
                  </Route>
                  <Route path="/my-ranking">
                    <RankProjects
                      projects={data.projects}
                      userFavourites={favourites}
                      toggleFavourite={toggleFavourite}
                      swapFavourites={swapFavourites}
                      showRankMessage={showRankMessage}
                      setRankMessage={setRankMessage}
                    />
                  </Route>
                  <Route path="/group-ranking">
                    <RankGroup
                      createGroup={createGroup}
                      joinGroup={joinGroup}
                      isGroupOwner={isGroupOwner}
                      enableGroupOwner={() => setIsGroupOwner(true)}
                      groupId={groupId}
                      userId={userId}
                      socketConnected={socketConnected}
                      connect={connect}
                      projects={data.projects}
                      userFavourites={favourites}
                      groupFavourites={groupFavourites}
                      groupHasLoaded={groupHasLoaded}
                      toggleFavourite={toggleFavourite}
                      swapGroupFavourites={swapGroupFavourites}
                      showRankMessage={showRankMessage}
                      setRankMessage={setRankMessage}
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
