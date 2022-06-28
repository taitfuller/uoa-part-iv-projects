import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import { useProjects } from "./context/Projects";
import Header from "./components/Header";
import Loading from "./components/Loading";

const Layout: React.VFC = () => {
  const { isLoading } = useProjects();

  return (
    <>
      <Header />
      <Container component="main" sx={{ minHeight: "100%", py: 4 }}>
        <Box sx={(theme) => theme.mixins.toolbar} />
        {isLoading ? <Loading message="Loading Projects..." /> : <Outlet />}
      </Container>
    </>
  );
};

export default Layout;
