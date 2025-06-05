import Icons from "@/data/icons";

const mainMenuItems = [
  {
    label: "Workspaces",
    key: "workspaces",
    icon: <Icons.LayoutGrid size={18} />,
  },
  {
    label: "Templates",
    key: "templates",
    icon: <Icons.Template size={18} />,
  },
];

export const final = [
  {
    label: "Terms of use",
    key: "terms",
    icon: <Icons.Terms size={16} />,
  },
  {
    label: "Report a bug",
    key: "report",
    icon: <Icons.Bug size={16} />,
  },
];

export const homeMenu = {
  viewer: mainMenuItems,
  admin: [...mainMenuItems],
};
