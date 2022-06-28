import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { useProjects } from "../context/Projects";
import { useFavourites } from "../context/Favourites";
import { Project } from "../types";
import Filter from "../components/Filter";
import ProjectCard from "../components/ProjectCard";

type SelectedFilters = {
  toggledFavourites: boolean;
  toggledUnallocated: boolean;
  selectedSupervisors: string[];
  selectedCosupervisors: string[];
  selectedSpecialisations: string[];
  selectedCategories: string[];
};

const ExplorePage: React.FC = () => {
  const { projects, supervisors, cosupervisors, specialisations, categories } =
    useProjects();
  const { userFavourites, toggleFavourite } = useFavourites();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    toggledFavourites: false,
    toggledUnallocated: true,
    selectedSupervisors: [],
    selectedCosupervisors: [],
    selectedSpecialisations: [],
    selectedCategories: [],
  });

  const selectFilter = (projectItems: string[], selectedItems: string[]) => {
    if (selectedItems.length > 0) {
      return !selectedItems.every((item) => !projectItems.includes(item));
    }
    return true;
  };

  const filters = [
    (project: Project) =>
      selectedFilters.toggledFavourites ? userFavourites.has(project.id) : true,
    (project: Project) =>
      selectedFilters.toggledUnallocated ? !project.allocated : true,
    (project: Project) =>
      selectFilter(project.supervisors, selectedFilters.selectedSupervisors),
    (project: Project) =>
      selectFilter(
        project.cosupervisors,
        selectedFilters.selectedCosupervisors
      ),
    (project: Project) =>
      selectFilter(
        project.specialisations,
        selectedFilters.selectedSpecialisations
      ),
    (project: Project) =>
      selectFilter(project.categories, selectedFilters.selectedCategories),
  ];

  const filteredProjects = projects.filter((project) =>
    filters.every((filter) => filter(project))
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4, mb: -4 }}>
      <Filter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        count={filteredProjects.length}
        supervisors={supervisors}
        cosupervisors={cosupervisors}
        specialisations={specialisations}
        categories={categories}
      />
      {filteredProjects.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 10, mb: 4 }}>
          No projects found&nbsp;
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 48, mb: -2 }} />
        </Typography>
      ) : (
        <Virtuoso
          useWindowScroll
          data={filteredProjects}
          increaseViewportBy={1000}
          itemContent={(_index, project) => (
            <Box sx={{ pb: 4 }}>
              <ProjectCard
                key={project.id}
                project={project}
                isFavourite={userFavourites.has(project.id)}
                toggleFavourite={toggleFavourite}
              />
            </Box>
          )}
        />
      )}
    </Box>
  );
};

export default ExplorePage;
