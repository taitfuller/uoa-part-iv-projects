import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProjectsProvider } from "./context/Projects";
import { GroupProvider } from "./context/Group";
import { FavouritesProvider } from "./context/Favourites";
import { ConnectionProvider } from "./context/Connection";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { DialogProvider } from "./context/Dialog";
import { SnackbarProvider } from "./context/Snackbar";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectsProvider>
        <GroupProvider>
          <FavouritesProvider>
            <ConnectionProvider>
              <CssBaseline />
              <DialogProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </DialogProvider>
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
