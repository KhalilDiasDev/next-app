import React, { createContext } from "react";

interface props {
  workspace: Workspace.Props;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace.Props>>;
  handleWorkspaceChange: (field: string, value: any) => void;
  isSaving: boolean;
  toggleSaving: (value: boolean) => void;
  userPermission: PermissionLevels;
}

export const WorkspaceContext = createContext<props>({
  workspace: {
    id: "",
    _id: { $oid: "" },
    name: "",
    description: "",
    user_id: "",
    canvas: {
      requirements: {
        extra: [],
        items: [],
      },
      value_proposition: {
        extra: [],
        items: [],
      },
      business_model: {
        extra: [],
        items: [],
      },
      business_impact: {
        extra: [],
        items: [],
      },
    },
  },
  setWorkspace: () => {},
  handleWorkspaceChange: () => {},
  isSaving: false,
  toggleSaving: () => {},
  userPermission: "viewer",
});
