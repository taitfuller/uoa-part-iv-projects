import React from "react";

import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";

interface FavouriteButtonProps {
  active: boolean;
  toggle: () => void;
}

const FavouriteButton: React.VFC<FavouriteButtonProps> = ({
  active,
  toggle,
}) => (
  <Tooltip title={active ? "Unfavourite" : "Favourite"}>
    <IconButton onClick={toggle} size="large">
      {active ? (
        <FavoriteIcon fontSize="large" sx={{ color: red[500] }} />
      ) : (
        <FavoriteBorderIcon fontSize="large" />
      )}
    </IconButton>
  </Tooltip>
);

export default FavouriteButton;
