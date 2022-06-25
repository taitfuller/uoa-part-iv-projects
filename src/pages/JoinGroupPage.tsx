import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useHistory } from "react-router";
import { useGroup } from "../context/Group";
import { useConnection } from "../context/Connection";
import { useSnackbar } from "../context/Snackbar";
import { useCopyAccessCode } from "../hooks/copy";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: "100%",
  },
  groupCardContainer: {
    marginTop: theme.spacing(2),
  },
  groupCardItem: {
    maxWidth: "400px",
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

const JoinGroupPage: React.VFC = () => {
  const { createGroup, joinGroup, groupId, userId } = useGroup();
  const { connectGroup } = useConnection();
  const openSnackbar = useSnackbar();
  const copyAccessCode = useCopyAccessCode();

  const history = useHistory();

  const [accessCode, setAccessCode] = useState(groupId);

  const [loadingJoinGroup, setLoadingJoinGroup] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const classes = useStyles();

  const joinGroupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingJoinGroup(true);
    try {
      await joinGroup(accessCode);
      connectGroup();
    } catch (err) {
      openSnackbar((err as Error).message, "error");
    }
    setLoadingJoinGroup(false);
    history.replace("/group-ranking");
  };

  const createGroupHandler = async () => {
    setLoadingCreateGroup(true);
    try {
      await createGroup();
    } catch (err) {
      openSnackbar((err as Error).message, "error");
    }
    setLoadingCreateGroup(false);
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
      {userId && groupId ? (
        <Grid item xs className={classes.groupCardItem}>
          <Paper className={classes.groupCard}>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="h6">You&apos;re all set!</Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Share this Access Code with your partner:
                </Typography>
              </Grid>
              <Grid item>
                <Paper className={classes.inputRoot} elevation={3}>
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
                <Button
                  onClick={() => history.replace("/group-ranking")}
                  variant="contained"
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
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
                  <Typography>Enter your partners Access Code:</Typography>
                </Grid>
                <Grid item>
                  <Paper
                    component="form"
                    className={classes.inputRoot}
                    elevation={3}
                    onSubmit={joinGroupHandler}
                  >
                    <InputBase
                      className={classes.input}
                      placeholder="Access Code"
                      value={accessCode}
                      onChange={(event) =>
                        setAccessCode(event.target.value.toUpperCase())
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
                        disabled={accessCode === "" || loadingCreateGroup}
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
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Typography variant="h6">Create Group</Typography>
                </Grid>
                <Grid item>
                  <Typography>Don&apos;t have an Access Code?</Typography>
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
    </Grid>
  );
};

export default JoinGroupPage;
