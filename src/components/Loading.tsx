import React from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message: string;
}

const Loading: React.VFC<LoadingProps> = ({ message }) => (
  <Box
    sx={{
      mt: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      rowGap: 4,
    }}
  >
    <CircularProgress size={40} />
    <Typography variant="h5">{message}</Typography>
  </Box>
);

export default Loading;
