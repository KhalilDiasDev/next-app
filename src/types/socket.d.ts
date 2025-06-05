export {};

declare global {
  namespace Socket {
    interface UserProps {
      board?: string;
      nodes?: string[];
      note_id?: noteId;
      user?: string;
      user_id: string;
    }

    interface UpdateInfoProps {
      board: string;
      nodes?: Flow.NodeProps[];
      user_id: string;
      operation?: "update" | "delete";
      note_id?: number;
    }

    interface Props {
      activeUsers: UserProps[];
      updateInfo?: UpdateInfoProps;
    }

    interface MouseEventProps {
      position: { x: number; y: number };
      user: Socket.UserProps;
    }
  }
}
