import { useCallback } from "react";
import { Project } from "../types";

export const useUpdateUserFavourites = () =>
  useCallback((socket: WebSocket, favourites: Set<Project["id"]>) => {
    const data = JSON.stringify({
      action: "updateUserFavourites",
      data: [...favourites],
    });
    socket.send(data);
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
            value: valueA,
          },
          b: {
            index: indexB,
            value: valueB,
          },
        },
      };
      socket?.send(JSON.stringify(data));
    },
    []
  );
