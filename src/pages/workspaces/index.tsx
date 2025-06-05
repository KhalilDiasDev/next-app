import React from "react";
import withAuth from "@/utils/authSession";
import MyWorkspacesLayout from "@/layouts/home/workspaces";

function WokrpsacePage() {
  return <MyWorkspacesLayout />;
}

export default withAuth(WokrpsacePage);
