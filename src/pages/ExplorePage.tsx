import React, { useState } from "react";

import { Container, Grid, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import Filter from "../components/Filter";
import ProjectCard from "../components/ProjectCard";
import { Project } from "../types";
import { useProjects } from "../context/Projects";
import { useFavourites } from "../context/Favourites";

type SelectedFilters = {
  toggledFavourites: boolean;
  toggledUnallocated: boolean;
  selectedSupervisors: string[];
  selectedCosupervisors: string[];
  selectedSpecialisations: string[];
  selectedCategories: string[];
};

const ExplorePage: React.VFC = () => {
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
    <div>
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
        <Container style={{ marginTop: 80 }}>
          <Grid container direction="column" alignItems="center" spacing={6}>
            <Grid item>
              <Typography variant="h4">
                No projects found&nbsp;
                <SentimentVeryDissatisfiedIcon
                  style={{ fontSize: 60, marginBottom: -15 }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isFavourite={userFavourites.has(project.id)}
            toggleFavourite={() => toggleFavourite(project.id)}
          />
        ))
      )}
    </div>
  );
};

export default ExplorePage;
