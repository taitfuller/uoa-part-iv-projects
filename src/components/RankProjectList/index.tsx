import React from "react";

import { Divider, Paper } from "@mui/material";

import { Project } from "../../types";
import RankProjectItem from "./RankProjectItem";

interface RankProjectListProps {
  projects: Project[];
  favourites: Set<Project["id"]>;
  toggleFavourite: (id: Project["id"]) => void;
  swapFavourites: (a: number, b: number) => void;
}

const RankProjectList: React.FC<RankProjectListProps> = ({
  projects,
  favourites,
  toggleFavourite,
  swapFavourites,
}) => {
  return (
    <Paper>
      {projects.map((project, i) => (
        <React.Fragment key={project.id}>
          <RankProjectItem
            i={i}
            project={project}
            isFirst={i === 0}
            isLast={i === projects.length - 1}
            isFavourite={favourites.has(project.id)}
            toggleFavourite={toggleFavourite}
            swapFavourites={swapFavourites}
          />
          <Divider />
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default RankProjectList;
