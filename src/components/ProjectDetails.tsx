import React from "react";

import {
  Box,
  Button,
  Chip,
  Divider,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Project } from "../types";
import FavouriteButton from "./FavouriteButton";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

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
  const isMobile = useMediaQuery("(max-width:640px)");

  return (
    <>
      <Section>
        <Typography variant="overline">Description</Typography>
        {project.description.map((description, i) => (
          <Typography paragraph key={i} sx={{ wordWrap: "break-word" }}>
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
      <Section
        sx={
          !isMobile ? { display: "flex", justifyContent: "space-between" } : {}
        }
      >
        <Column sx={{ alignItems: "flex-start" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Supervisor
          </Typography>
          <ChipList items={project.supervisors} />
        </Column>
        {project.cosupervisors.length > 0 && (
          <Column sx={{ alignItems: isMobile ? "flex-start" : "flex-end" }}>
            <Typography variant="overline" sx={{ mb: -1 }}>
              Co-Supervisor
            </Typography>
            <ChipList items={project.cosupervisors} />
          </Column>
        )}
      </Section>
      <Divider />
      <Section
        sx={
          !isMobile ? { display: "flex", justifyContent: "space-between" } : {}
        }
      >
        <Column sx={{ alignItems: "flex-start" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Categories
          </Typography>
          <ChipList items={project.categories} />
        </Column>
        <Column sx={{ alignItems: isMobile ? "flex-start" : "flex-end" }}>
          <Typography variant="overline" sx={{ mb: -1 }}>
            Specialisations
          </Typography>
          <ChipList items={project.specialisations} />
        </Column>
      </Section>
      <Divider />
      <Section sx={{ display: "flex", justifyContent: "space-between" }}>
        <FavouriteButton active={isFavourite} toggle={toggleFavourite} />
        <Button href={project.url} target="_blank">
          Go to Official Page
        </Button>
      </Section>
    </>
  );
};

export default ProjectDetails;
