import { createContext } from "react";

interface props {
  disabled: boolean;
  socketData: Socket.Props;
  selectedItem?: keyof Workspace.WorkspaceCanvasProps;
  handleSocket: (
    nodes: any[],
    operation?: "update" | "delete",
    noteId?: number
  ) => void;
  handleRemoveUser: (id?: string) => void;
  toggleDrawer: (v?: boolean) => void;
  nodeFunctions: (id: string) => {
    deleteNode: () => any;
    addNote: (value?: string) => any;
    updateProp: (prop: string, value: any) => any;
    updateNote: (
      operation: "update" | "delete" | "deleteAll",
      noteIndex?: number,
      noteField?: string,
      value?: string
    ) => any;
  };
}

export const FlowContext = createContext<props>({
  disabled: false,
  socketData: { activeUsers: [] },
  handleRemoveUser: (id?: string) => undefined,
  selectedItem: undefined,
  handleSocket: () => undefined,
  toggleDrawer: () => undefined,
  nodeFunctions: (id: string) => {
    return {
      deleteNode: () => undefined,
      addNote: (value?: string) => undefined,
      updateProp: (prop: string, value: any) => undefined,
      updateNote: (
        operation: "update" | "delete" | "deleteAll",
        noteIndex?: number,
        noteField?: string,
        value?: string
      ) => undefined,
    };
  },
});
