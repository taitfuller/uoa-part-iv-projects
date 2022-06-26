import React, { useCallback, useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Tab,
  TabProps,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Route } from "react-router-dom";

const ToolbarTab = styled(Tab)<TabProps<Link>>(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

interface HeaderProps {
  pages: {
    name: string;
    href: string;
    paths: string[];
  }[];
}

const Header: React.VFC<HeaderProps> = ({ pages }) => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:940px)");
  const isMobile = useMediaQuery("(max-width:740px)");

  useEffect(() => {
    !isMobile && setBurgerOpen(false);
  }, [isMobile]);

  const toggleBurgerOpen = useCallback(
    () => setBurgerOpen((state) => !state),
    []
  );

  return (
    <>
      <AppBar component="nav" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton color="inherit" onClick={toggleBurgerOpen} size="large">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flex: isDesktop ? "1 0" : "" }}>
            2021 Part IV Projects
          </Typography>
          {!isMobile && (
            <Route
              path="/"
              render={({ location }) => (
                <Tabs
                  value={
                    pages.findIndex((page) =>
                      page.paths.includes(location.pathname)
                    ) ?? -1
                  }
                >
                  {pages.map((page, i) => (
                    <ToolbarTab
                      label={page.name}
                      component={Link}
                      to={page.href}
                      value={i}
                      key={page.name}
                    />
                  ))}
                </Tabs>
              )}
            />
          )}
          {isDesktop && <Box sx={{ flex: "1 0" }} />}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={burgerOpen}
          onClose={toggleBurgerOpen}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        >
          <Toolbar>
            <IconButton color="inherit" onClick={toggleBurgerOpen} size="large">
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={{ pt: 0 }}>
            <Route
              path="/"
              render={({ location }) =>
                pages.map((page) => (
                  <ListItem
                    button
                    component={Link}
                    to={page.href}
                    selected={page.paths.includes(location.pathname)}
                    key={page.name}
                  >
                    <ListItemText primary={page.name} />
                  </ListItem>
                ))
              }
            />
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
