export {};

declare global {
  interface ListItemProps {
    value: any;
    label: string;
  }

  interface TourStep {
    title: string;
    description: string;
    target: () => null;
  }

  type GenericObject = { [x: string]: any };

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_HEIGHT: number;
      NEXT_PUBLIC_NODE_GAP_Y: number;
    }
  }
  interface PermissionsProps {
    viewer?: string[];
    editor?: string[];
    maintainer?: string[];
  }

  interface PermissionLevelsListProps {
    viewer?: { [x: string]: { [x: string]: boolean } };
    editor?: { [x: string]: { [x: string]: boolean } };
    maintainer?: { [x: string]: { [x: string]: boolean } };
  }

  type PermissionLevels = "viewer" | "editor" | "maintainer" | "admin";

  interface TabsProps {
    key: string;
    label: string;
    icon?: JSX.Element;
    children: JSX.Element;
  }

  interface LogoProps {
    file: UploadFile<any>;
    preview: string;
  }
}
