import React, { useState } from "react";

import { Container, Grid, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

import Filter from "./Filter";
import ProjectCard from "./ProjectCard";

export default function ExploreProjects({ data, favourites, toggleFavourite }) {
  const [selectedFilters, setSelectedFilters] = useState({
    toggledFavourites: false,
    toggledUnallocated: true,
    selectedSupervisors: [],
    selectedCosupervisors: [],
    selectedSpecialisations: [],
    selectedCategories: [],
  });

  const selectFilter = (projectItems, selectedItems) => {
    if (selectedItems.length > 0) {
      return !selectedItems.every((item) => !projectItems.includes(item));
    }
    return true;
  };

  const filters = [
    (project) =>
      selectedFilters.toggledFavourites ? favourites.has(project.id) : true,
    (project) =>
      selectedFilters.toggledUnallocated ? !project.allocated : true,
    (project) =>
      selectFilter(project.supervisors, selectedFilters.selectedSupervisors),
    (project) =>
      selectFilter(
        project.cosupervisors,
        selectedFilters.selectedCosupervisors
      ),
    (project) =>
      selectFilter(
        project.specialisations,
        selectedFilters.selectedSpecialisations
      ),
    (project) =>
      selectFilter(project.categories, selectedFilters.selectedCategories),
  ];

  const filteredProjects = data.projects.filter((project) =>
    filters.every((filter) => filter(project))
  );

  return (
    <div>
      <Filter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        count={filteredProjects.length}
        supervisors={data.supervisors}
        cosupervisors={data.cosupervisors}
        specialisations={data.specialisations}
        categories={data.categories}
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
            isFavourite={favourites.has(project.id)}
            toggleFavourite={() => toggleFavourite(project.id)}
          />
        ))
      )}
    </div>
  );
}
