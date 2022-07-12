import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App";
import { ProjectsProvider } from "./contexts/Projects";
import { GroupProvider } from "./contexts/Group";
import { FavouritesProvider } from "./contexts/Favourites";
import { ConnectionProvider } from "./contexts/Connection";
import { DialogProvider } from "./contexts/Dialog";
import { SnackbarProvider } from "./contexts/Snackbar";
import { ThemeProvider } from "./contexts/Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <GroupProvider>
          <FavouritesProvider>
            <ConnectionProvider>
              <ThemeProvider>
                <CssBaseline />
                <DialogProvider>
                  <SnackbarProvider>
                    <App />
                  </SnackbarProvider>
                </DialogProvider>
              </ThemeProvider>
            </ConnectionProvider>
          </FavouritesProvider>
        </GroupProvider>
      </ProjectsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
