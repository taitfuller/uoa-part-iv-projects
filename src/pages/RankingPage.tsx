import React from "react";

import RankTable from "../components/RankTable";
import { useFavourites } from "../context/Favourites";
import { useFilterAndSortFavourites } from "../hooks/filter";
import HideableAlert from "../components/HideableAlert";
import NoFavouritesMessage from "../components/NoFavouritesMessage";
import { Box } from "@mui/material";

const RankingPage: React.VFC = () => {
  const { userFavourites, toggleFavourite, swapUserFavourites } =
    useFavourites();

  const favouriteProjects = useFilterAndSortFavourites(userFavourites);

  if (favouriteProjects.length === 0) return <NoFavouritesMessage />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      <HideableAlert
        localStorageKey="hideRankMessage"
        message="Your top 5 projects are highlighted"
      />
      <RankTable
        projects={favouriteProjects}
        userFavourites={userFavourites}
        toggleFavourite={toggleFavourite}
        swapFavourites={swapUserFavourites}
      />
    </Box>
  );
};

export default RankingPage;
