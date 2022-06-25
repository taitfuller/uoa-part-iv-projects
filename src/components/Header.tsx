import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nav: {
    color: theme.palette.getContrastText(theme.palette.info.dark),
    backgroundColor: theme.palette.info.dark,
  },
  fullHeightTabs: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: 240,
  },
}));

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

const Header: React.VFC = () => {
  const classes = useStyles();

  const [burgerOpen, setBurgerOpen] = useState(false);

  const centerNav = useMediaQuery("(min-width:940px)");
  const burgerMenu = useMediaQuery("(max-width:740px)");

  return (
    <React.Fragment>
      <AppBar className={classes.nav}>
        <Toolbar>
          <Grid
            container
            direction={burgerMenu ? "row-reverse" : "row"}
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={!burgerMenu}>
              <Typography variant="h6">2021 Part IV Projects</Typography>
            </Grid>
            <Grid item xs={burgerMenu}>
              {burgerMenu ? (
                <IconButton
                  color="inherit"
                  onClick={() => setBurgerOpen(!burgerOpen)}
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
                      className={classes.fullHeightTabs}
                    >
                      {pages.map((page, i) => (
                        <Tab
                          label={page.name}
                          className={classes.fullHeightTabs}
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
                anchor="left"
                open={burgerOpen}
                onClose={() => setBurgerOpen(false)}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true,
                }}
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
