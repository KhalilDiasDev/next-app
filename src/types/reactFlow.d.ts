export {};

declare global {
  namespace Flow {
    interface NodeDataProps {
      title: string;
      subtitle?: string;
      notes: { color?: string; text: string }[];
      comment?: string;
      rows: number;
      cols: number;
      offsetX?: { before?: number; after?: number };
      offsetY?: { before?: number; after?: number };
      step?: number | string;
      type?: "board" | "text" | "image";
      image?: string;
      description?: string;
      link?: string;
      index?: number;
    }

    type NodeProps = {
      id: string;
      data: NodeDataProps | Workspace.ExtraPropsData;
      type?: string;
      position: Flow.Position;
    };

    type SetNodesType = React.Dispatch<
      React.SetStateAction<Node<NodeDataProps[], string | undefined>[]>
    >;
    // type SetEdgesType = React.Dispatch<
    //   React.SetStateAction<Edge<any, string | undefined>[]>
    // >;
    type SetEdgesType = any;
    type Position = { x: number; y: number };

    interface ControlProps {
      tooltip: string;
      onClick: () => void;
      icon: React.ReactNode;
      disabled?: boolean;
      id?: string;
    }
  }
}
