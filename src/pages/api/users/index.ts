import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import QIAMService from "@/services/qiam";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const token = (session?.user as any)?.access_token;

  const request = () =>
    QIAMService.getAllUsers(token, req.query.search as string);
  await requestHandler(res, request, {
    success: "successfully retrieved users",
    error: "Error getting users",
  });
}

const methods = {
  GET: getUsers,
};

export default apiHandler(methods);
