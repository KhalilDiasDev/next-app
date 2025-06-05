import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import { NotificationService } from "@/services/notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function getNotifications(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as any;

  let id = session?.user?.id;

  if (!id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const request = () =>
    NotificationService.getNotifications(id, req.query.filter as string);
  await requestHandler(res, request, {
    success: "successfully retrieved notifications",
    error: "Error getting notifications",
  });
}

async function createNotification(req: NextApiRequest, res: NextApiResponse) {
  const request = () => NotificationService.createNotification(req.body);
  await requestHandler(res, request, {
    success: "Notification created successfully",
    error: "Error creating notifications",
  });
}

const methods = {
  GET: getNotifications,
  POST: createNotification,
};

export default apiHandler(methods);
