import React from 'react'

import { Typography } from '@material-ui/core'

import Filter from './Filter'
import Project from './Project'

export default function Projects(props) {
  return (
    <div>
      <Filter
        count={props.data.projects.length}
        supervisors={props.data.supervisors}
        cosupervisors={props.data.cosupervisors}
        specialisations={props.data.specialisations}
        categories={props.data.categories} />
      {props.data.projects.map((project) => (
        <Project project={project} />
      ))}
    </div>
  )
}