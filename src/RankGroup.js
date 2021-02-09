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

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: "100%",
  },
  groupCardContainer: {
    marginTop: theme.spacing(2),
  },
  groupCardItem: {
    maxWidth: "300px",
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
    position: 'relative',
  },
  createButtonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function RankProjects() {
  const [groupId, setGroupId] = useState("");

  const [loadingJoinGroup, setLoadingJoinGroup] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const classes = useStyles();

  const joinGroup = (event) => {
    event.preventDefault();
    setLoadingJoinGroup(true);
    // alert(`Join Group: ${groupId}`);
    setTimeout(() => setLoadingJoinGroup(false), 1000);
  };

  const createGroup = () => {
    setLoadingCreateGroup(true);
    // alert("Create group");
    setTimeout(() => setLoadingCreateGroup(false), 1000);
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
      <Grid item xs className={classes.groupCardItem}>
        <Paper className={classes.groupCard}>
          <Grid container direction="column" spacing={2} alignItems="center">
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
                  value={groupId}
                  onChange={(event) =>
                    setGroupId(event.target.value.toUpperCase())
                  }
                />
                {loadingJoinGroup ? (
                  <CircularProgress className={classes.inputSubmit} size={44} />
                ) : (
                  <IconButton
                    type="submit"
                    className={classes.inputSubmit}
                    disabled={groupId === "" || loadingCreateGroup}
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
                  onClick={createGroup}
                  disabled={loadingJoinGroup || loadingCreateGroup}
                >
                  Create Group
                </Button>
                {loadingCreateGroup && <CircularProgress size={24} className={classes.createButtonProgress} />}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
