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
    route: "/explore",
  },
  {
    name: "My Ranking",
    route: "/my-ranking",
  },
  {
    name: "Group Ranking",
    route: "/group-ranking",
  },
];

export default function Header() {
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
                      value={location.pathname}
                      className={classes.fullHeightTabs}
                    >
                      {pages.map((page) => (
                        <Tab
                          label={page.name}
                          className={classes.fullHeightTabs}
                          component={Link}
                          to={page.route}
                          value={page.route}
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
                      to={page.route}
                      selected={page.route === location.pathname}
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
}
