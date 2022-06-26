import React from "react";

import { Avatar, Box, Chip, Divider, Paper, Typography } from "@mui/material";

import ProjectDetails from "./ProjectDetails";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const ProjectCard: React.VFC<ProjectCardProps> = ({
  project,
  isFavourite,
  toggleFavourite,
}) => (
  <Paper sx={{ p: 2 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: 2,
        mb: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main" }}>{project.id}</Avatar>
      <Typography variant="h5" sx={{ flex: 1, fontWeight: "bold" }}>
        {project.title}
      </Typography>
      {project.allocated ? (
        <Chip label="Allocated" />
      ) : (
        <Chip label="Unallocated" color="primary" />
      )}
    </Box>
    <Divider />
    <ProjectDetails
      project={project}
      isFavourite={isFavourite}
      toggleFavourite={toggleFavourite}
    />
  </Paper>
);

export default ProjectCard;
