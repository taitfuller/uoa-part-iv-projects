import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 140,
  },
}));

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

const Filter: React.VFC<FilterProps> = ({
  selectedFilters,
  setSelectedFilters,
  supervisors,
  cosupervisors,
  specialisations,
  categories,
  count,
}) => {
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

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={0}
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h6">Filter</Typography>
            </Grid>
            <Grid item>
              <Typography variant="button" noWrap>
                ({count})
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
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
            labelPlacement="top"
          />
        </Grid>
        <Grid item>
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
            labelPlacement="top"
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
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
                      selectedFilters.selectedSupervisors.indexOf(supervisor) >
                      -1
                    }
                  />
                  <ListItemText primary={supervisor} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="cosupervisor-filter-label">
              Co-Supervisors
            </InputLabel>
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
                      selectedFilters.selectedCosupervisors.indexOf(
                        cosupervisor
                      ) > -1
                    }
                  />
                  <ListItemText primary={cosupervisor} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
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
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filter;
