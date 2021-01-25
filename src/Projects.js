import React from 'react'

import Filter from './Filter'
import Project from './Project'

export default function Projects(props) {
  return (
    <div>
      <Filter
        supervisors={props.data.supervisors}
        cosupervisors={props.data.cosupervisors}
        specialisations={props.data.specialisations}
        categories={props.data.categories} />
      <Project />
      <Project />
      <Project />
    </div>
  )
}