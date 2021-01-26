import React from 'react'

import { Checkbox, FormControl, FormControlLabel, Grid, Input, InputLabel, ListItemText, makeStyles, MenuItem, Paper, Select, Switch, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginBottom: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 140,
  },
}))

export default function Filter(props) {
  const handleChecked = (event) => {
    props.setSelectedFilters({...props.selectedFilters, [event.target.name]: event.target.checked})
  }

  const handleSelect = (event) => {
    props.setSelectedFilters({...props.selectedFilters, [event.target.name]: event.target.value})
  }

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" wrap="nowrap" spacing={2} alignItems="center">
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={0} wrap="nowrap">
            <Grid item>
              <Typography variant="h6">Filter</Typography>
            </Grid>
            <Grid item>
            <Typography variant="button" noWrap>({props.count})</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={props.selectedFilters.toggledFavourites}
                onChange={handleChecked}
                color="primary"
                name="toggledFavourites"
              />
            }
            label="Favourites"
            labelPlacement="top" />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={props.selectedFilters.toggledUnallocated}
                onChange={handleChecked}
                color="primary"
                name="toggledUnallocated"
              />
            }
            label="Unallocated"
            labelPlacement="top" />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="supervisor-filter-label">Supervisors</InputLabel>
            <Select
              labelId="supervisor-filter-label"
              id="supervisor-filter"
              multiple
              value={props.selectedFilters.selectedSupervisors}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedSupervisors">
              {props.supervisors.map((supervisor) => (
                <MenuItem key={supervisor} value={supervisor}>
                  <Checkbox checked={props.selectedFilters.selectedSupervisors.indexOf(supervisor) > -1} />
                  <ListItemText primary={supervisor} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="cosupervisor-filter-label">Co-Supervisors</InputLabel>
            <Select
              labelId="cosupervisor-filter-label"
              id="cosupervisor-filter"
              multiple
              value={props.selectedFilters.selectedCosupervisors}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedCosupervisors">
              {props.cosupervisors.map((cosupervisor) => (
                <MenuItem key={cosupervisor} value={cosupervisor}>
                  <Checkbox checked={props.selectedFilters.selectedCosupervisors.indexOf(cosupervisor) > -1} />
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
              value={props.selectedFilters.selectedSpecialisations}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedSpecialisations">
              {props.specialisations.map((specialisation) => (
                <MenuItem key={specialisation} value={specialisation}>
                  <Checkbox checked={props.selectedFilters.selectedSpecialisations.indexOf(specialisation) > -1} />
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
              value={props.selectedFilters.selectedCategories}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedCategories">
              {props.categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={props.selectedFilters.selectedCategories.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}