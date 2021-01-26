import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { red } from '@material-ui/core/colors'

export default function FavouriteButton({ active, toggle }) {
  if (active) {
    return (
      <IconButton aria-label="favourite" onClick={() => toggle()}>
        <FavoriteIcon fontSize="large" style={{ color: red[500] }} />
      </IconButton>
    )
  } else {
    return (
      <IconButton aria-label="favourite" onClick={() => toggle()}>
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
    )
  }
}
