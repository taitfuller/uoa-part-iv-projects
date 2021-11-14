import React from "react";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { red } from "@material-ui/core/colors";
import { Tooltip } from "@material-ui/core";

interface FavouriteButtonProps {
  active: boolean
  toggle: () => void
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ active, toggle }: FavouriteButtonProps) => {
  if (active) {
    return (
      <Tooltip title="Unfavourite">
        <IconButton aria-label="favourite" onClick={toggle}>
          <FavoriteIcon fontSize="large" style={{ color: red[500] }} />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Favourite">
        <IconButton aria-label="favourite" onClick={() => toggle()}>
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    );
  }
}

export default FavouriteButton
