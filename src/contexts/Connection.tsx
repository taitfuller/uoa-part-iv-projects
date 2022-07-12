import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useUpdateUserFavourites } from "../hooks/update";
import hasOwnProperty from "../types/hasOwnProperty";
import { useFavourites } from "./Favourites";
import { useGroup } from "./Group";

type ConnectionContextType = {
  connectGroup: () => void;
  disconnectGroup: () => void;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

export const ConnectionProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { socket, groupId, userId, connect, disconnect } = useGroup();
  const { userFavourites, setGroupFavourites } = useFavourites();
  const updateUserFavourites = useUpdateUserFavourites();

  const connectGroup = useCallback(() => {
    const onOpen = (socket: WebSocket) => {
      updateUserFavourites(socket, userFavourites);
    };

    const onMessage = (data: unknown) => {
      if (
        data &&
        typeof data === "object" &&
        hasOwnProperty(data, "favouritesList") &&
        Array.isArray(data.favouritesList)
      ) {
        setGroupFavourites(new Set(data.favouritesList));
      }
    };

    connect(onOpen, onMessage);
  }, [connect, updateUserFavourites, userFavourites, setGroupFavourites]);

  const disconnectGroup = useCallback(() => {
    if (socket) {
      updateUserFavourites(socket, new Set());
    }
    disconnect();
  }, [disconnect, socket, updateUserFavourites]);

  useEffect(() => {
    if (!socket && groupId && userId) connectGroup();
  }, [connectGroup, groupId, socket, userId]);

  const context = useMemo<ConnectionContextType>(
    () => ({ connectGroup, disconnectGroup }),
    [connectGroup, disconnectGroup]
  );

  return (
    <ConnectionContext.Provider value={context}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);

  if (context === undefined) {
    throw new Error("useConnection() must be used within a ConnectionProvider");
  }

  return context;
};
