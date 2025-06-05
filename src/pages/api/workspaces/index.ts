import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import { WorkspaceService } from "@/services/workspace";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function getWorkspaces(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as any;

  let id = (session?.user as any)?.isAdmin ? "" : session?.user?.id;

  const request = () =>
    WorkspaceService.getWorkspaces(id, req.query.filter as string);
  await requestHandler(res, request, {
    success: "successfully retrieved workspaces",
    error: "Error getting workspaces",
  });
}

async function createWorkspace(req: NextApiRequest, res: NextApiResponse) {
  const request = () => WorkspaceService.createWorkspace(req.body);
  await requestHandler(res, request, {
    success: "Workspace created successfully!",
    error: "Error creating workspaces",
  });
}

const methods = {
  GET: getWorkspaces,
  POST: createWorkspace,
};

export default apiHandler(methods);
