import { useCallback } from "react";

import { Project } from "../types";

export const useUpdateUserFavourites = () =>
  useCallback((socket: WebSocket, favourites: Set<Project["id"]>) => {
    const data = {
      action: "updateUserFavourites",
      data: [...favourites],
    };
    socket.send(JSON.stringify(data));
  }, []);

export const useUpdateGroupFavourites = () =>
  useCallback(
    (
      socket: WebSocket,
      indexA: number,
      valueA: string,
      indexB: number,
      valueB: string
    ) => {
      const data = {
        action: "updateGroupFavourites",
        data: {
          a: {
            index: indexA,
            value: valueB,
          },
          b: {
            index: indexB,
            value: valueA,
          },
        },
      };
      socket.send(JSON.stringify(data));
    },
    []
  );
