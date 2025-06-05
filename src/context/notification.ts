import { createContext, useContext } from "react";

interface props {
  notification: any;
}

export const NotificationContext = createContext<props>({
  notification: null,
});

export const useNotificationContext = () => useContext(NotificationContext);
