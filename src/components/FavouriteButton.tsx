import React from "react";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { red } from "@material-ui/core/colors";
import { Tooltip } from "@material-ui/core";

interface FavouriteButtonProps {
  active: boolean;
  toggle: () => void;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  active,
  toggle,
}) => (
  <Tooltip title={active ? "Unfavourite" : "Favourite"}>
    <IconButton onClick={toggle}>
      {active ? (
        <FavoriteIcon fontSize="large" style={{ color: red[500] }} />
      ) : (
        <FavoriteBorderIcon fontSize="large" />
      )}
    </IconButton>
  </Tooltip>
);

export default FavouriteButton;
