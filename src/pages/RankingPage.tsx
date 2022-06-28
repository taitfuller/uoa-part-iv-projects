import React from "react";

import { Box } from "@mui/material";

import { useFavourites } from "../context/Favourites";
import HideableAlert from "../components/HideableAlert";
import NoFavouritesMessage from "../components/NoFavouritesMessage";
import RankProjectList from "../components/RankProjectList";
import { useFilterAndSortFavourites } from "../hooks/filter";

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
      <RankProjectList
        projects={favouriteProjects}
        favourites={userFavourites}
        toggleFavourite={toggleFavourite}
        swapFavourites={swapUserFavourites}
      />
    </Box>
  );
};

export default RankingPage;
