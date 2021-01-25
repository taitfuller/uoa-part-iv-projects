import React, { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { red } from '@material-ui/core/colors'

export default function FavouriteButton() {
  const [toggled, setToggled] = useState(false)

  if (toggled) {
    return (
      <IconButton aria-label="favourite" onClick={() => setToggled(false)}>
        <FavoriteIcon fontSize="large" style={{ color: red[500] }} />
      </IconButton>
    )
  } else {
    return (
      <IconButton aria-label="favourite" onClick={() => setToggled(true)}>
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
    )
  }
}
