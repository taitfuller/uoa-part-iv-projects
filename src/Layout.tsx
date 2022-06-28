import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Container, Link, Typography } from "@mui/material";

import { useProjects } from "./context/Projects";
import Header from "./components/Header";
import Loading from "./components/Loading";

const Layout: React.FC = () => {
  const { isLoading } = useProjects();

  return (
    <Box sx={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container component="main" sx={{ py: 4, flex: 1 }}>
        <Box sx={(theme) => theme.mixins.toolbar} />
        {isLoading ? <Loading message="Loading Projects..." /> : <Outlet />}
      </Container>
      <Typography variant="body2" align="center" sx={{ mb: 4 }}>
        Made by{" "}
        <Link
          href="https://www.linkedin.com/in/taitfuller/"
          target="_blank"
          rel="noopener"
        >
          Tait Fuller
        </Link>
        . View source on{" "}
        <Link
          href="https://github.com/taitfuller/uoa-part-iv-projects"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Link>
        .
      </Typography>
    </Box>
  );
};

export default Layout;
