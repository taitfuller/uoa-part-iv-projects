import React, { useState } from "react";

import {
  AppBar,
  Drawer,
  Grid,
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

const pages = [
  {
    name: "Explore",
    href: "/explore",
    paths: ["/explore"],
  },
  {
    name: "My Ranking",
    href: "/my-ranking",
    paths: ["/my-ranking"],
  },
  {
    name: "Group Ranking",
    href: "/group-ranking",
    paths: ["/group-ranking", "/join-group"],
  },
];

const ToolbarTab = styled(Tab)<TabProps<Link>>(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Header: React.VFC = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const centerNav = useMediaQuery("(min-width:940px)");
  const burgerMenu = useMediaQuery("(max-width:740px)");

  return (
    <React.Fragment>
      <AppBar component="nav" color="default">
        <Toolbar>
          <Grid
            container
            direction={burgerMenu ? "row-reverse" : "row"}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={!burgerMenu}>
              <Typography variant="h6">2021 Part IV Projects</Typography>
            </Grid>
            <Grid item xs={burgerMenu}>
              {burgerMenu ? (
                <IconButton
                  color="inherit"
                  onClick={() => setBurgerOpen(!burgerOpen)}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              ) : (
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
            </Grid>
            {centerNav && <Grid item xs />}
          </Grid>
        </Toolbar>
      </AppBar>
      {burgerMenu && (
        <nav>
          <Route
            path="/"
            render={({ location }) => (
              <Drawer
                variant="temporary"
                open={burgerOpen}
                onClose={() => setBurgerOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{ "& .MuiDrawer-paper": { width: 240 } }}
              >
                <List>
                  {pages.map((page) => (
                    <ListItem
                      button
                      component={Link}
                      to={page.href}
                      selected={page.paths.includes(location.pathname)}
                      key={page.name}
                    >
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            )}
          />
        </nav>
      )}
    </React.Fragment>
  );
};

export default Header;
