import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: "100%",
  },
  groupCardContainer: {
    marginTop: theme.spacing(2),
  },
  groupCardItem: {
    maxWidth: "350px",
  },
  groupCard: {
    height: "105%",
    padding: theme.spacing(2),
  },
  inputRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  inputSubmit: {
    padding: 10,
  },
  createButtonWrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  createButtonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  accessCode: {
    marginLeft: 40,
    marginRight: 20,
  },
}));

export default function RankProjects({
  createGroup,
  isGroupOwner,
  enableGroupOwner,
  groupId,
  userId,
  connect,
}) {
  const [newGroupId, setNewGroupId] = useState(groupId);

  const [loadingJoinGroup, setLoadingJoinGroup] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const [showCopied, setShowCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const joinGroup = (event) => {
    event.preventDefault();
    setLoadingJoinGroup(true);
    setTimeout(() => setLoadingJoinGroup(false), 1000);
  };

  const createGroupHandler = async () => {
    setLoadingCreateGroup(true);
    enableGroupOwner();
    try {
      await createGroup();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
    setLoadingCreateGroup(false);
  };

  const copyAccessCode = () => {
    navigator.clipboard
      .writeText(groupId)
      .then(() => setShowCopied(true))
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <Grid
      container
      direction="row"
      spacing={4}
      justify="center"
      alignItems="stretch"
      className={classes.groupCardContainer}
    >
      {userId !== "" && groupId !== "" ? (
        isGroupOwner ? (
          <Grid item xs className={classes.groupCardItem}>
            <Paper className={classes.groupCard}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">You're all set!</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    Give this access code to your partner:
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper
                    component="form"
                    className={classes.inputRoot}
                    elevation={3}
                    onSubmit={joinGroup}
                  >
                    <Typography className={classes.accessCode} id="access-code">
                      {groupId}
                    </Typography>
                    <IconButton
                      onClick={copyAccessCode}
                      className={classes.inputSubmit}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item>
                  <Button onClick={connect} variant="contained">
                    Done
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Snackbar
              open={showCopied}
              autoHideDuration={3000}
              onClose={() => setShowCopied(false)}
            >
              <Alert onClose={() => setShowCopied(false)} severity="success">
                Access Code Copied!
              </Alert>
            </Snackbar>
          </Grid>
        ) : (
          <Grid item xs className={classes.groupCardItem}>
            <Paper className={classes.groupCard}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">Whoops!</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    We couldn't connect to our server
                    <SentimentVeryDissatisfiedIcon
                      style={{ marginBottom: -5, marginLeft: 5 }}
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={connect}
                    disabled={loadingJoinGroup || loadingCreateGroup}
                  >
                    Reconnect
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      ) : (
        <React.Fragment>
          <Grid item xs className={classes.groupCardItem}>
            <Paper className={classes.groupCard}>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">Join Group</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    Enter your partners access code to join their group
                  </Typography>
                </Grid>
                <Grid item>
                  <Paper
                    component="form"
                    className={classes.inputRoot}
                    elevation={3}
                    onSubmit={joinGroup}
                  >
                    <InputBase
                      className={classes.input}
                      placeholder="Access Code"
                      value={newGroupId}
                      onChange={(event) =>
                        setNewGroupId(event.target.value.toUpperCase())
                      }
                    />
                    {loadingJoinGroup ? (
                      <CircularProgress
                        className={classes.inputSubmit}
                        size={44}
                      />
                    ) : (
                      <IconButton
                        type="submit"
                        className={classes.inputSubmit}
                        disabled={newGroupId === "" || loadingCreateGroup}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs className={classes.groupCardItem}>
            <Paper className={classes.groupCard}>
              <Grid
                container
                className={classes.fullHeight}
                direction="column"
                spacing={2}
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Typography variant="h6">Create Group</Typography>
                </Grid>
                <Grid item>
                  <Typography>Don't have an access code?</Typography>
                </Grid>
                <Grid item>
                  <div className={classes.createButtonWrapper}>
                    <Button
                      variant="contained"
                      onClick={createGroupHandler}
                      disabled={loadingJoinGroup || loadingCreateGroup}
                    >
                      Create Group
                    </Button>
                    {loadingCreateGroup && (
                      <CircularProgress
                        size={24}
                        className={classes.createButtonProgress}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </React.Fragment>
      )}
      <Snackbar
        open={errorMessage !== ""}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
