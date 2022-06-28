import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App";
import { ProjectsProvider } from "./context/Projects";
import { GroupProvider } from "./context/Group";
import { FavouritesProvider } from "./context/Favourites";
import { ConnectionProvider } from "./context/Connection";
import { DialogProvider } from "./context/Dialog";
import { SnackbarProvider } from "./context/Snackbar";
import { ThemeProvider } from "./context/Theme";

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
