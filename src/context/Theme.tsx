import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import useLocalStorage from "use-local-storage";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from "@mui/material";

export type ThemePreference = "system" | "light" | "dark";

type ThemeContextType = {
  themePreference: ThemePreference;
  setThemePreference: (themePreference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#fafafa",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [themePreference, setThemePreference] =
    useLocalStorage<ThemePreference>("themePreference", "system");

  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const theme = themePreference === "system" ? systemTheme : themePreference;

  const value = useMemo(
    () => ({ themePreference, setThemePreference }),
    [setThemePreference, themePreference]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const themeInstance = useContext(ThemeContext);

  if (themeInstance === undefined) {
    throw new Error("useTheme() must be used within a ThemeProvider");
  }

  return themeInstance;
};
