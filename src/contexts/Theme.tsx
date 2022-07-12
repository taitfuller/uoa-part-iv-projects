import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import useLocalStorage from "use-local-storage";

import {
  createTheme,
  responsiveFontSizes,
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

  const context = useMemo(
    () => ({ themePreference, setThemePreference }),
    [setThemePreference, themePreference]
  );

  return (
    <ThemeContext.Provider value={context}>
      <MUIThemeProvider
        theme={responsiveFontSizes(theme === "light" ? lightTheme : darkTheme)}
      >
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme() must be used within a ThemeProvider");
  }

  return context;
};
