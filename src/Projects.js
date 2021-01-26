import React, { useEffect, useState } from 'react'

import Filter from './Filter'
import Project from './Project'

export default function Projects({ data }) {
  const [favourites, setFavourites] = useState(
    () => new Set(JSON.parse(localStorage.getItem('favourites'))) || new Set()
  )

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify([...favourites]))
  }, [favourites])

  const toggleFavourite = (id) => {
    const update = new Set(favourites)
    update.has(id) ? update.delete(id) : update.add(id)
    setFavourites(update)
  }

  return (
    <div>
      <Filter
        count={data.projects.length}
        supervisors={data.supervisors}
        cosupervisors={data.cosupervisors}
        specialisations={data.specialisations}
        categories={data.categories} />
      {data.projects.map((project) => (
        <Project
          project={project}
          isFavourite={favourites.has(project.id)}
          toggleFavourite={() => toggleFavourite(project.id)} />
      ))}
    </div>
  )
}