import React from "react";

import { CircularProgress, Grid, Typography } from "@material-ui/core";

import RankingPage from "./RankingPage";
import { Project } from "../types";

interface RankGroupProps {
  projects: Project[];
  userFavourites: Set<Project["id"]>;
  groupFavourites: Set<Project["id"]>;
  userCount: number;
  groupHasLoaded: boolean;
  toggleFavourite: (id: Project["id"]) => void;
  swapGroupFavourites: (a: number, b: number) => void;
  setShowLeaveGroupDialog: (show: boolean) => void;
  copyAccessCode: () => void;
}

const RankGroup: React.FC<RankGroupProps> = ({
  projects,
  userFavourites,
  groupFavourites,
  userCount,
  groupHasLoaded,
  toggleFavourite,
  swapGroupFavourites,
  setShowLeaveGroupDialog,
  copyAccessCode,
}) => {
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

  return (
    <RankingPage
      projects={projects}
      userFavourites={userFavourites}
      toggleFavourite={toggleFavourite}
      swapFavourites={swapGroupFavourites}
      groupFavourites={groupFavourites}
      userCount={userCount}
      setShowLeaveGroupDialog={setShowLeaveGroupDialog}
      isGroup={true}
      copyAccessCode={copyAccessCode}
    />
  );
};

export default RankGroup;
