import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Tab,
  TabProps,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { Link, Route } from "react-router-dom";

import { useTheme, ThemePreference } from "../context/Theme";

const ToolbarTab = styled(Tab)<TabProps<Link>>(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const themeOptions: {
  name: string;
  key: ThemePreference;
  icon: SvgIconComponent;
}[] = [
  { name: "Light", key: "light", icon: LightModeIcon },
  { name: "System", key: "system", icon: SettingsBrightnessIcon },
  { name: "Dark", key: "dark", icon: DarkModeIcon },
];

interface ThemeIconProps {
  icon: SvgIconComponent;
}

const ThemeIcon: React.VFC<ThemeIconProps> = ({ icon }) => {
  const Icon = icon;
  return <Icon />;
};

interface HeaderProps {
  pages: {
    name: string;
    href: string;
    paths: string[];
  }[];
}

const Header: React.VFC<HeaderProps> = ({ pages }) => {
  const [isBurgerOpen, setBurgerOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:980px)");
  const isMobile = useMediaQuery("(max-width:740px)");

  const { themePreference, setThemePreference } = useTheme();

  const [themeMenuAnchor, setThemeMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const isThemeMenuOpen = useMemo(() => !!themeMenuAnchor, [themeMenuAnchor]);

  useEffect(() => {
    !isMobile && setBurgerOpen(false);
  }, [isMobile]);

  const handleToggleBurgerOpen = useCallback(
    () => setBurgerOpen((isOpen) => !isOpen),
    []
  );

  const handleOpenThemeMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setThemeMenuAnchor(event.currentTarget),
    []
  );

  const handleCloseThemeMenu = useCallback(() => setThemeMenuAnchor(null), []);

  const handleSetThemePreference = useCallback(
    (
      _event: React.MouseEvent<HTMLElement>,
      newThemePreference: ThemePreference
    ) => newThemePreference && setThemePreference(newThemePreference),
    [setThemePreference]
  );

  return (
    <>
      <AppBar component="nav" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleToggleBurgerOpen}
              size="large"
            >
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
          {!isMobile && (
            <Box sx={{ flex: isDesktop ? "1 0" : "0" }}>
              <Tooltip title="Change Theme" sx={{ float: "right" }}>
                <IconButton size="large" onClick={handleOpenThemeMenu}>
                  {themePreference === "light" ? (
                    <LightModeIcon />
                  ) : themePreference === "dark" ? (
                    <DarkModeIcon />
                  ) : (
                    <SettingsBrightnessIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                id="theme-menu"
                anchorEl={themeMenuAnchor}
                open={isThemeMenuOpen}
                onClose={handleCloseThemeMenu}
              >
                {themeOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    selected={themeOptions[index].key === themePreference}
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      handleSetThemePreference(event, themeOptions[index].key)
                    }
                  >
                    <ListItemIcon>
                      <ThemeIcon icon={option.icon} />
                    </ListItemIcon>
                    <ListItemText>{option.name}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={isBurgerOpen}
          onClose={handleToggleBurgerOpen}
          ModalProps={{ keepMounted: true }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleToggleBurgerOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <ToggleButtonGroup
              value={themePreference}
              exclusive
              onChange={handleSetThemePreference}
              sx={{ ml: 3 }}
            >
              {themeOptions.map((option, index) => (
                <ToggleButton key={index} value={option.key}>
                  <ThemeIcon icon={option.icon} />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
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
