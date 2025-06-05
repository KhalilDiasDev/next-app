import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import QIAMService from "@/services/qiam";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const token = (session?.user as any)?.access_token;

  const request = () => QIAMService.getUserById(token, req.query.id as string);
  await requestHandler(res, request, {
    success: "successfully retrieved users",
    error: "Error updating user",
  });
}

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const token = (session?.user as any)?.access_token;

  const request = () =>
    QIAMService.updateUser(req.query.id as string, req.body, token);
  await requestHandler(res, request, {
    success: "User updated successfully",
    error: "Error updating user",
  });
}

// async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);
//   const token = (session?.user as any)?.access_token;

//   const request = () => QIAMService.deleteUser(req.query.id as string, token);
//   await requestHandler(res, request, {
//     success: "User deleted successfully",
//     error: "Error deleting user",
//   });
// }

const methods = {
  GET: getUserById,
  PUT: editUser,
  // DELETE: deleteUser,
};

export default apiHandler(methods);
