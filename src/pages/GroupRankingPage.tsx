import React from "react";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

import RankingPage from "./RankingPage";
import { useGroup } from "../context/Group";
import { useCopyAccessCode } from "../hooks/copy";

const RankGroup: React.VFC = () => {
  const { groupHasLoaded } = useGroup();
  const copyAccessCode = useCopyAccessCode();

  if (!groupHasLoaded) {
    return (
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
          <Typography variant="h5">Loading Group Data...</Typography>
        </Grid>
      </Grid>
    );
  }

  return <RankingPage isGroup={true} copyAccessCode={copyAccessCode} />;
};

export default RankGroup;
