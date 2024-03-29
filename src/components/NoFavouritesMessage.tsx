import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NoFavouritesMessage: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      rowGap: 6,
      mt: 10,
      textAlign: "center",
    }}
  >
    <Typography variant="h5">
      You don&apos;t have any favourite projects&nbsp;
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 48, mb: -2 }} />
    </Typography>
    <Typography variant="body1">
      You can favourite projects by clicking{" "}
      <FavoriteBorderIcon sx={{ mb: -1 }} fontSize="large" /> on the Explore
      page
    </Typography>
    <Button component={Link} variant="contained" size="large" to="/explore">
      Explore Projects
    </Button>
  </Box>
);

export default NoFavouritesMessage;
