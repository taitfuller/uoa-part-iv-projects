import React, { useCallback, useState } from "react";

import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Project } from "../../types";
import ProjectDetails from "../ProjectDetails";
import AllocatedChip from "../AllocatedChip";

interface RankProjectItemProps {
  i: number;
  project: Project;
  isFirst: boolean;
  isLast: boolean;
  isFavourite: boolean;
  toggleFavourite: (id: Project["id"]) => void;
  swapFavourites: (a: number, b: number) => void;
}

const RankProjectItem: React.FC<RankProjectItemProps> = ({
  i,
  project,
  isFirst,
  isLast,
  isFavourite,
  toggleFavourite,
  swapFavourites,
}: RankProjectItemProps) => {
  const [isDetailOpen, setDetailOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:980px)");
  const isMobile = useMediaQuery("(max-width:740px)");

  const handleToggleDetailOpen = useCallback(
    () => setDetailOpen((isDetailOpen) => !isDetailOpen),
    []
  );

  const handleToggleFavourite = useCallback(
    () => toggleFavourite(project.id),
    [project.id, toggleFavourite]
  );

  const handleSwapFavouritesUp = useCallback(
    () => swapFavourites(i, i - 1),
    [i, swapFavourites]
  );

  const handleSwapFavouritesDown = useCallback(
    () => swapFavourites(i, i + 1),
    [i, swapFavourites]
  );

  return (
    <Box
      sx={(theme) => (i >= 5 ? { bgcolor: theme.palette.action.hover } : {})}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: "flex-end",
            rowGap: 1,
          }}
        >
          <Tooltip title="Increase">
            <span>
              <IconButton disabled={isFirst} onClick={handleSwapFavouritesUp}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Decrease">
            <span>
              <IconButton disabled={isLast} onClick={handleSwapFavouritesDown}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        {!isMobile && (
          <Avatar sx={{ bgcolor: i < 5 ? "primary.main" : "" }}>
            {project.id}
          </Avatar>
        )}
        <Typography variant="h6" sx={{ flex: 1 }}>
          {project.title}
        </Typography>
        {!isMobile && (
          <AllocatedChip
            allocated={project.allocated}
            allocatedColor={i >= 5 ? "default" : undefined}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            rowGap: 1,
          }}
        >
          <Tooltip title={`Show ${isDetailOpen ? "Less" : "More"}`}>
            <IconButton onClick={handleToggleDetailOpen}>
              {isDetailOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove" sx={{ order: isDesktop ? 0 : -1 }}>
            <span>
              <IconButton
                onClick={handleToggleFavourite}
                disabled={!isFavourite}
              >
                <ClearIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Collapse in={isDetailOpen} unmountOnExit>
        <Box sx={{ mt: -2 }}>
          <ProjectDetails
            project={project}
            isFavourite={isFavourite}
            toggleFavourite={handleToggleFavourite}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default RankProjectItem;
