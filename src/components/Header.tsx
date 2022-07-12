import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";

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
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { SvgIconComponent } from "@mui/icons-material";

import { useTheme, ThemePreference } from "../contexts/Theme";

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

const ThemeIcon: React.FC<ThemeIconProps> = ({ icon }) => {
  const Icon = icon;
  return <Icon />;
};

const pathNames = {
  "/explore": "Explore",
  "/my-ranking": "My Ranking",
  "/group-ranking": "Group Ranking",
};
const paths = Object.keys(pathNames) as Array<keyof typeof pathNames>;

const Header: React.FC = () => {
  const location = useLocation();
  const pathMatch = paths.find((path) =>
    matchPath({ path, end: false }, location.pathname)
  );

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
            UoA Part IV Projects
          </Typography>
          {!isMobile && (
            <Tabs value={pathMatch ?? false}>
              {paths.map((path, i) => (
                <Tab
                  key={i}
                  value={path}
                  label={pathNames[path]}
                  component={Link}
                  to={path}
                  sx={(theme) => ({
                    ...theme.mixins.toolbar,
                  })}
                />
              ))}
            </Tabs>
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
            {paths.map((path, i) => (
              <ListItem
                key={i}
                button
                component={Link}
                to={path}
                selected={pathMatch === path}
              >
                <ListItemText primary={pathNames[path]} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
