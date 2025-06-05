export {};

declare global {
  namespace Workspace {
    interface ExtraPropsData {
      text?: string;
      color?: string;
    }

    interface ExtraProps {
      id: string;
      type: string;
      position: Flow.Position;
      data: ExtraPropsData;
    }

    interface CanvasModelProps {
      name: keyof WorkspaceCanvasProps;
      label: string;
      description?: string;
      elements: Flow.NodeDataProps[];
      extra?: ExtraProps[];
    }

    interface NotesProps {
      color?: string;
      text: string;
    }

    interface CanvasItemProps {
      comment?: string;
      notes: NotesProps[];
    }

    interface WorkspaceCanvasProps {
      requirements: {
        extra?: ExtraProps[];
        items: CanvasItemProps[];
      };
      value_proposition: {
        extra?: ExtraProps[];
        items: CanvasItemProps[];
      };
      business_model: {
        extra?: ExtraProps[];
        items: CanvasItemProps[];
      };
      business_impact: {
        extra?: ExtraProps[];
        items: CanvasItemProps[];
      };
    }

    interface Props {
      id: any;
      user_id: any;
      name: string;
      description: string;
      canvas: WorkspaceCanvasProps;
      template?: boolean;
      _id: {
        $oid: string;
      };
      logo?: LogoProps;
      permissions?: PermissionsProps;
      introduction?: string;
      createdAt?: string;
    }

    interface WorkspaceDataStateProps {
      data: Workspace.Props;
      setData: Dispatch<SetStateAction<Workspace.Props>>;
      userPermission: PermissionLevels;
    }
    interface TemplateCanvasProps {
      key: string;
      label: string;
      description?: string;
      data: any;
    }
  }
}
