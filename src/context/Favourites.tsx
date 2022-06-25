import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "use-local-storage";
import {
  useUpdateGroupFavourites,
  useUpdateUserFavourites,
} from "../hooks/update";
import { Project } from "../types";
import { useGroup } from "./Group";

interface FavouritesContextType {
  userFavourites: Set<Project["id"]>;
  groupFavourites: Set<Project["id"]>;
  setGroupFavourites: React.Dispatch<React.SetStateAction<Set<Project["id"]>>>;
  toggleFavourite: (id: Project["id"]) => void;
  swapUserFavourites: (indexA: number, indexB: number) => void;
  swapGroupFavourites: (indexA: number, indexB: number) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider: React.FC = ({ children }) => {
  const { socket } = useGroup();
  const updateUserFavourites = useUpdateUserFavourites();
  const updateGroupFavourites = useUpdateGroupFavourites();

  const [userFavourites, setUserFavourites] = useLocalStorage<
    Set<Project["id"]>
  >("favourites", new Set(), {
    serializer: (obj) => JSON.stringify([...(obj ?? [])]),
    parser: (str) => new Set(JSON.parse(str)),
  });

  const [groupFavourites, setGroupFavourites] = useState<Set<Project["id"]>>(
    new Set()
  );

  const toggleFavourite = useCallback(
    (id: Project["id"]) => {
      console.log("start toggle");
      const update = new Set(userFavourites);
      update.has(id) ? update.delete(id) : update.add(id);
      setUserFavourites(update);
      if (socket) {
        updateUserFavourites(socket, update);
      }
      console.log("end toggle");
    },
    [setUserFavourites, socket, updateUserFavourites, userFavourites]
  );

  const swapUserFavourites = useCallback(
    (indexA: number, indexB: number) => {
      const update = [...userFavourites];
      [update[indexA], update[indexB]] = [update[indexB], update[indexA]];
      setUserFavourites(new Set(update));
    },
    [setUserFavourites, userFavourites]
  );

  const swapGroupFavourites = useCallback(
    (indexA: number, indexB: number) => {
      const update = [...groupFavourites];
      [update[indexA], update[indexB]] = [update[indexB], update[indexA]];
      setGroupFavourites(new Set(update));
      if (socket) {
        updateGroupFavourites(
          socket,
          indexA,
          update[indexA],
          indexB,
          update[indexB]
        );
      }
    },
    [groupFavourites, socket, updateGroupFavourites]
  );

  const value = useMemo<FavouritesContextType>(
    () => ({
      userFavourites,
      groupFavourites,
      setGroupFavourites,
      toggleFavourite,
      swapUserFavourites,
      swapGroupFavourites,
    }),
    [
      groupFavourites,
      swapGroupFavourites,
      swapUserFavourites,
      toggleFavourite,
      userFavourites,
    ]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const favouritesInstance = useContext(FavouritesContext);

  if (favouritesInstance === undefined) {
    throw new Error("useFavourites() must be used within a FavouritesProvider");
  }

  return favouritesInstance;
};
