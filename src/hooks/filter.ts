import { useMemo } from "react";

import { useProjects } from "../contexts/Projects";
import { Project } from "../types";

export const useFilterAndSortFavourites = (
  favourites: Set<Project["id"]>
): Project[] => {
  const { projects } = useProjects();

  const favouritesIndexes = useMemo(
    () =>
      [...favourites].reduce(
        (favouritesIndexes, id, i) => favouritesIndexes.set(id, i),
        new Map<Project["id"], number>()
      ),
    [favourites]
  );

  return useMemo(
    () =>
      projects
        .filter((project) => favourites.has(project.id))
        .sort(
          (a, b) =>
            (favouritesIndexes.get(a.id) ?? 0) -
            (favouritesIndexes.get(b.id) ?? 0)
        ),
    [favourites, favouritesIndexes, projects]
  );
};
