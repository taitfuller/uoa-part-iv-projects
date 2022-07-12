import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
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

type FavouritesContextType = {
  userFavourites: Set<Project["id"]>;
  groupFavourites: Set<Project["id"]>;
  setGroupFavourites: (favourites: Set<Project["id"]>) => void;
  toggleFavourite: (id: Project["id"]) => void;
  swapUserFavourites: (indexA: number, indexB: number) => void;
  swapGroupFavourites: (indexA: number, indexB: number) => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined
);

export const FavouritesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
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
      setUserFavourites((userFavourites) => {
        const update = new Set(userFavourites);
        update.has(id) ? update.delete(id) : update.add(id);
        return update;
      });
    },
    [setUserFavourites]
  );

  useEffect(() => {
    if (socket && socket.readyState === socket.OPEN) {
      updateUserFavourites(socket, userFavourites);
    }
  }, [socket, updateUserFavourites, userFavourites]);

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

  const context = useMemo<FavouritesContextType>(
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
    <FavouritesContext.Provider value={context}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextType => {
  const context = useContext(FavouritesContext);

  if (context === undefined) {
    throw new Error("useFavourites() must be used within a FavouritesProvider");
  }

  return context;
};
