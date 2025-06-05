import { useEffect, useState } from "react";
import io from "socket.io-client";

interface EventProps {
  type: "updateInfo" | "activeUsers";
  data: Socket.UserProps | Socket.UpdateInfoProps;
}

export interface SocketFunctionProps {
  socketData: Socket.Props;
  sendUpdate: (data: Socket.UpdateInfoProps) => void;
  updateActiveUsers: (data: Socket.UserProps) => void;
  mousePositions: Socket.MouseEventProps[];
  onMouseMove: (
    user: Socket.UserProps,
    position: { x: number; y: number }
  ) => void;
}

// Start Socket.io client
const socket = io({
  path: "/api/socket", // Set up the path of the Socket.io server
});

export function useSocket(roomName: string) {
  const [socketData, setSocketData] = useState<Socket.Props>({
    activeUsers: [],
  });
  const [mousePositions, setMousePositions] = useState<
    Socket.MouseEventProps[]
  >([]);

  useEffect(() => {
    socket.emit("joinRoom", roomName);

    // Connect to the Socket.io server
    socket.on("update", (event: EventProps) => {
      if (event.type === "updateInfo") {
        const data = event.data as Socket.UpdateInfoProps;
        setSocketData((prev) => ({ ...prev, updateInfo: data }));
      }

      if (event.type === "activeUsers") {
        const data = event.data as Socket.UserProps;

        setSocketData((prev) => {
          let activeUsers = prev.activeUsers;
          if (event.data.board) {
            // add the user to activeUsers
            if (!activeUsers.find((item) => item.user_id === data.user_id)) {
              activeUsers.push(event.data as Socket.UserProps);
            } else {
              // update the user in activeUsers
              activeUsers = prev.activeUsers.map((item) => {
                if (item.user_id === data.user_id) {
                  return event.data as Socket.UserProps;
                }
                return item;
              });
            }
          } else {
            // remove the user from activeUsers
            activeUsers = prev.activeUsers.filter(
              (item) => item.user_id !== data.user_id
            );
            setMousePositions((prev) =>
              prev.filter((item) => item.user.user_id !== data.user_id)
            );
          }

          return { ...prev, activeUsers };
        });
      }
    });

    socket.on("mouseMove", (event: Socket.MouseEventProps) => {
      // add user to mousePositions if it doesn't exist

      setMousePositions((prev) => {
        if (!prev.find((item) => item.user.user_id === event.user.user_id)) {
          return [...prev, event];
        }
        return prev.map((item) => {
          if (item.user.user_id === event.user.user_id) {
            return { ...item, position: event.position };
          }
          return item;
        });
      });
    });

    // clean connection when component unmount
    return () => {
      socket.off("update");
      socket.off("mouseMove");
    };
  }, []);

  // send notification to server
  const sendUpdate = (data: Socket.UpdateInfoProps) => {
    socket.emit("update", { room: roomName, type: "updateInfo", data });
  };

  const updateActiveUsers = (data: Socket.UserProps) => {
    socket.emit("update", { room: roomName, type: "activeUsers", data });
  };

  const onMouseMove = (
    user: Socket.UserProps,
    position: { x: number; y: number }
  ) => {
    socket.emit("mouseMove", { room: roomName, user, position });
  };

  return {
    mousePositions,
    socketData,
    sendUpdate,
    updateActiveUsers,
    onMouseMove,
  };
}
