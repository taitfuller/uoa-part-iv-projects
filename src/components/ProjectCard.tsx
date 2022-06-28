import React, { useCallback } from "react";

import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";

import { Project } from "../types";
import ProjectDetails from "./ProjectDetails";
import AllocatedChip from "./AllocatedChip";

interface ProjectCardProps {
  project: Project;
  isFavourite: boolean;
  toggleFavourite: (id: Project["id"]) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFavourite,
  toggleFavourite,
}) => {
  const handleToggleFavourite = useCallback(
    () => toggleFavourite(project.id),
    [project.id, toggleFavourite]
  );

  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 2,
          p: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>{project.id}</Avatar>
        <Typography variant="h5" sx={{ flex: 1, fontWeight: "bold" }}>
          {project.title}
        </Typography>
        <AllocatedChip allocated={project.allocated} />
      </Box>
      <Divider />
      <ProjectDetails
        project={project}
        isFavourite={isFavourite}
        toggleFavourite={handleToggleFavourite}
      />
    </Paper>
  );
};

export default React.memo(ProjectCard);
