import React, { useState } from 'react'

import { Checkbox, FormControl, FormControlLabel, Grid, Input, InputLabel, ListItemText, makeStyles, MenuItem, Paper, Select, Switch, Typography } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'

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
  const [state, setState] = useState({
    favourites: false,
    selectedSupervisors: [],
    selectedCosupervisors: [],
    selectedSpecialisations: [],
    selectedTopics: [],
  })

  const handleChecked = (event) => {
    setState({...state, [event.target.name]: event.target.checked})
  }

  const handleSelect = (event) => {
    setState({...state, [event.target.name]: event.target.value})
  }

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" wrap="nowrap" spacing={2} alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={1} wrap="nowrap">
            <Grid item>
              <FilterListIcon />
            </Grid>
            <Grid item>
              <Typography variant="h6">Filter</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={state.favourites}
                onChange={handleChecked}
                name="favourites"
              />
            }
            label="Favourites" />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="supervisor-filter-label">Supervisors</InputLabel>
            <Select
              labelId="supervisor-filter-label"
              id="supervisor-filter"
              multiple
              value={state.selectedSupervisors}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedSupervisors">
              {props.supervisors.map((supervisor) => (
                <MenuItem key={supervisor} value={supervisor}>
                  <Checkbox checked={state.selectedSupervisors.indexOf(supervisor) > -1} />
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
              value={state.selectedCosupervisors}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedCosupervisors">
              {props.cosupervisors.map((cosupervisor) => (
                <MenuItem key={cosupervisor} value={cosupervisor}>
                  <Checkbox checked={state.selectedCosupervisors.indexOf(cosupervisor) > -1} />
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
              value={state.selectedSpecialisations}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedSpecialisations">
              {props.specialisations.map((specialisation) => (
                <MenuItem key={specialisation} value={specialisation}>
                  <Checkbox checked={state.selectedSpecialisations.indexOf(specialisation) > -1} />
                  <ListItemText primary={specialisation} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="topic-filter-label">Topics</InputLabel>
            <Select
              labelId="topic-filter-label"
              id="topic-filter"
              multiple
              value={state.selectedTopics}
              onChange={handleSelect}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              name="selectedTopics">
              {props.topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  <Checkbox checked={state.selectedTopics.indexOf(topic) > -1} />
                  <ListItemText primary={topic} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}