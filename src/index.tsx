import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProjectsProvider } from "./context/Projects";
import { GroupProvider } from "./context/Group";
import { FavouritesProvider } from "./context/Favourites";
import { ConnectionProvider } from "./context/Connection";

ReactDOM.render(
  <React.StrictMode>
    <ProjectsProvider>
      <GroupProvider>
        <FavouritesProvider>
          <ConnectionProvider>
            <App />
          </ConnectionProvider>
        </FavouritesProvider>
      </GroupProvider>
    </ProjectsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
