import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "use-local-storage";

type GroupContextType = {
  socket: WebSocket | undefined;
  groupId: string;
  userId: string;
  userCount: number;
  groupHasLoaded: boolean;
  createGroup: () => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  connect: (
    onOpen: (socket: WebSocket) => void,
    onMessage: (data: unknown) => void
  ) => void;
  disconnect: () => void;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

async function postData(url = "") {
  const response = await fetch(url, {
    method: "POST",
  });
  return response.json();
}

export const GroupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket>();

  const [groupId, setGroupId] = useLocalStorage("groupId", "");

  const [userId, setUserId] = useLocalStorage("userId", "");

  const [userCount, setUserCount] = useState(1);

  const [groupHasLoaded, setGroupHasLoaded] = useState(false);

  const joinGroup = useCallback(
    async (groupId: string) => {
      try {
        const joinGroupResponse = await postData(
          `${process.env.REACT_APP_REST_URL}/join-group?groupId=${groupId}`
        );
        if (joinGroupResponse.userId) {
          setGroupId(groupId);
          setUserId(joinGroupResponse.userId);
        }
      } catch (_err) {
        throw new Error(
          "Whoops! Looks like you entered an invalid Access Code"
        );
      }
    },
    [setGroupId, setUserId]
  );

  const createGroup = useCallback(async () => {
    try {
      const createGroupResponse = await postData(
        `${process.env.REACT_APP_REST_URL}/create-group`
      );
      if (createGroupResponse.groupId) {
        setGroupId(createGroupResponse.groupId);

        await joinGroup(createGroupResponse.groupId);

        return createGroupResponse.groupId;
      }
    } catch (_err) {
      throw new Error("Whoops! Something went wrong - give it another go?");
    }
  }, [joinGroup, setGroupId]);

  const connect = useCallback(
    (
      onOpen: (socket: WebSocket) => void,
      onMessage: (data: unknown) => void
    ) => {
      const socket = new WebSocket(
        `${process.env.REACT_APP_WEBSOCKET_URL}?groupId=${groupId}&userId=${userId}`
      );

      socket.onopen = () => onOpen(socket);

      socket.onmessage = (event) => {
        if (event.data) {
          const data = JSON.parse(event.data);
          if (data.favouritesList) {
            setGroupHasLoaded(true);
          }
          if (data.userCount) {
            setUserCount(data.userCount);
          }

          onMessage(data);
        }
      };

      socket.onclose = socket.onerror = () => {
        setSocket(undefined);
      };

      setSocket(socket);
    },
    [groupId, userId]
  );

  const disconnect = useCallback(() => {
    setGroupId("");
    setUserId("");
    if (socket) {
      socket.close();
    }
  }, [setGroupId, setUserId, socket]);

  const value = useMemo<GroupContextType>(
    () => ({
      socket,
      groupId,
      userId,
      createGroup,
      joinGroup,
      userCount,
      groupHasLoaded,
      connect,
      disconnect,
    }),
    [
      connect,
      createGroup,
      disconnect,
      groupHasLoaded,
      groupId,
      joinGroup,
      socket,
      userCount,
      userId,
    ]
  );

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export const useGroup = (): GroupContextType => {
  const groupInstance = useContext(GroupContext);

  if (groupInstance === undefined) {
    throw new Error("useGroup() must be used within a GroupProvider");
  }

  return groupInstance;
};
