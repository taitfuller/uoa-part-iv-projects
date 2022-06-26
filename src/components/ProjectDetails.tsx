import React from "react";

import { Box, Button, Chip, Divider, styled, Typography } from "@mui/material";

import FavouriteButton from "./FavouriteButton";
import { Project } from "../types";

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const DualSection = styled(Section)({
  display: "flex",
  justifyContent: "space-between",
});

const Column = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(1),
}));

const List = styled("ul")({ marginTop: 0 });

interface ChipListProps {
  items: string[];
}

const ChipList: React.VFC<ChipListProps> = ({ items }) => (
  <>
    {items.map((item, i) => (
      <Chip key={i} label={item} />
    ))}
  </>
);

interface ProjectDetailsProps {
  project: Project;
  isFavourite: boolean;
  toggleFavourite: () => void;
}

const ProjectDetails: React.VFC<ProjectDetailsProps> = ({
  project,
  isFavourite,
  toggleFavourite,
}) => {
  return (
    <>
      <Section>
        <Typography variant="overline">Description</Typography>
        {project.description.map((description, i) => (
          <Typography paragraph key={i}>
            {description}
          </Typography>
        ))}
      </Section>
      <Divider />
      {project.outcomes.length > 0 && (
        <>
          <Section>
            <Typography variant="overline">Outcomes</Typography>
            <List>
              {project.outcomes.map((outcome, i) => (
                <li key={i}>
                  <Typography key={i}>{outcome}</Typography>
                </li>
              ))}
            </List>
          </Section>
          <Divider />
        </>
      )}
      <DualSection>
        <Column sx={{ alignItems: "flex-start" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Supervisor
          </Typography>
          <ChipList items={project.supervisors} />
        </Column>
        {project.cosupervisors.length > 0 && (
          <Column>
            <Typography variant="overline" sx={{ mb: -1 }}>
              Co-Supervisor
            </Typography>
            <ChipList items={project.cosupervisors} />
          </Column>
        )}
      </DualSection>
      <Divider />
      <DualSection>
        <Column sx={{ alignItems: "flex-start" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Categories
          </Typography>
          <ChipList items={project.categories} />
        </Column>
        <Column sx={{ alignItems: "flex-end" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Specialisations
          </Typography>
          <ChipList items={project.specialisations} />
        </Column>
      </DualSection>
      <Divider />
      <DualSection sx={{ mb: 0 }}>
        <FavouriteButton active={isFavourite} toggle={toggleFavourite} />
        <Button href={project.url} target="_blank">
          Go to Official Page
        </Button>
      </DualSection>
    </>
  );
};

export default ProjectDetails;
