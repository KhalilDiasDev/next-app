import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import { WorkspaceService } from "@/services/workspace";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { checkPermissions } from "@/utils/permissions/checkPermissions";
import formatError from "@/utils/format/formatError";

async function editWorkspace(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = (await getServerSession(req, res, authOptions)) as any;

    const workspaceId = req.query.id as string;
    const workspace = await WorkspaceService.getWorkspaceById(workspaceId);

    // checking user permissions
    checkPermissions("editor", workspace, session?.user);

    const request = () => WorkspaceService.editWorkspace(workspaceId, req.body);
    await requestHandler(res, request, {
      success: "Workspace updated successfully!",
      error: "Error updating workspace",
    });
  } catch (error) {
    return res.status(400).json({
      message: formatError(error),
    });
  }
}

async function deleteWorkspace(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = (await getServerSession(req, res, authOptions)) as any;

    const workspaceId = req.query.id as string;
    const workspace = await WorkspaceService.getWorkspaceById(workspaceId);

    // checking user permissions
    checkPermissions("maintainer", workspace, session?.user);

    await WorkspaceService.deleteWorkspace(workspaceId);

    return res.status(200).json({
      message: "Workspace deleted successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: formatError(error),
    });
  }
}

const methods = {
  PUT: editWorkspace,
  DELETE: deleteWorkspace,
};

export default apiHandler(methods);
