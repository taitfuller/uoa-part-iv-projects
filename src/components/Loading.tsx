import React from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

interface LoadingProps {
  message: string;
}

const Loading: React.VFC<LoadingProps> = ({ message }) => (
  <Grid
    container
    direction="column"
    justify="space-around"
    alignItems="center"
    spacing={4}
    style={{ marginTop: 80 }}
  >
    <Grid item>
      <CircularProgress size={40} />
    </Grid>
    <Grid item>
      <Typography variant="h5">{message}</Typography>
    </Grid>
  </Grid>
);

export default Loading;
