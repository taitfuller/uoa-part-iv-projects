import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type SelectedFilters = {
  toggledFavourites: boolean;
  toggledUnallocated: boolean;
  selectedSupervisors: string[];
  selectedCosupervisors: string[];
  selectedSpecialisations: string[];
  selectedCategories: string[];
};
interface FilterProps {
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFilters>>;
  supervisors: string[];
  cosupervisors: string[];
  specialisations: string[];
  categories: string[];
  count: number;
}

const Filter: React.FC<FilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  supervisors,
  cosupervisors,
  specialisations,
  categories,
  count,
}) => {
  const [isCollapseOpen, setCollapseOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width:880px)");

  useEffect(() => {
    isDesktop && setCollapseOpen(false);
  }, [isDesktop]);

  const toggleCollapseOpen = useCallback(
    () => setCollapseOpen((isOpen) => !isOpen),
    []
  );

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [event.target.name]: event.target.value,
    });
  };

  const selectControls = (
    <>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="supervisor-filter-label">Supervisors</InputLabel>
        <Select
          labelId="supervisor-filter-label"
          id="supervisor-filter"
          multiple
          value={selectedFilters.selectedSupervisors}
          onChange={handleSelect as never}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(", ")}
          name="selectedSupervisors"
        >
          {supervisors.map((supervisor) => (
            <MenuItem key={supervisor} value={supervisor}>
              <Checkbox
                checked={
                  selectedFilters.selectedSupervisors.indexOf(supervisor) > -1
                }
              />
              <ListItemText primary={supervisor} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="cosupervisor-filter-label">Co-Supervisors</InputLabel>
        <Select
          labelId="cosupervisor-filter-label"
          id="cosupervisor-filter"
          multiple
          value={selectedFilters.selectedCosupervisors}
          onChange={handleSelect as never}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(", ")}
          name="selectedCosupervisors"
        >
          {cosupervisors.map((cosupervisor) => (
            <MenuItem key={cosupervisor} value={cosupervisor}>
              <Checkbox
                checked={
                  selectedFilters.selectedCosupervisors.indexOf(cosupervisor) >
                  -1
                }
              />
              <ListItemText primary={cosupervisor} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="-filter-label">Specialisations</InputLabel>
        <Select
          labelId="specialisation-filter-label"
          id="specialisation-filter"
          multiple
          value={selectedFilters.selectedSpecialisations}
          onChange={handleSelect as never}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(", ")}
          name="selectedSpecialisations"
        >
          {specialisations.map((specialisation) => (
            <MenuItem key={specialisation} value={specialisation}>
              <Checkbox
                checked={
                  selectedFilters.selectedSpecialisations.indexOf(
                    specialisation
                  ) > -1
                }
              />
              <ListItemText primary={specialisation} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="category-filter-label">Categories</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          multiple
          value={selectedFilters.selectedCategories}
          onChange={handleSelect as never}
          input={<Input />}
          renderValue={(selected) => (selected as string[]).join(", ")}
          name="selectedCategories"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox
                checked={
                  selectedFilters.selectedCategories.indexOf(category) > -1
                }
              />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: isDesktop ? 4 : 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isDesktop ? "column" : "row",
            alignItems: "center",
            columnGap: isDesktop ? 0 : 1,
          }}
        >
          <Typography variant="h6">Filter</Typography>
          <Typography variant="button" noWrap>
            ({count})
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={selectedFilters.toggledFavourites}
              onChange={handleChecked}
              color="primary"
              name="toggledFavourites"
            />
          }
          label="Favourites"
          labelPlacement={isDesktop || isMobile ? "top" : "end"}
          sx={{ mx: 0 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={selectedFilters.toggledUnallocated}
              onChange={handleChecked}
              color="primary"
              name="toggledUnallocated"
            />
          }
          label="Unallocated"
          labelPlacement={isDesktop || isMobile ? "top" : "end"}
          sx={{ mx: 0 }}
        />
        {isDesktop && selectControls}
        {!isDesktop && (
          <Tooltip title={`Show ${isCollapseOpen ? "Less" : "More"}`}>
            <IconButton onClick={toggleCollapseOpen} size="large">
              {isCollapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Collapse in={isCollapseOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            rowGap: 2,
            columnGap: 4,
          }}
        >
          {selectControls}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Filter;
