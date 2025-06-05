import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import { NotificationService } from "@/services/notification";
import formatError from "@/utils/format/formatError";

async function editNotification(req: NextApiRequest, res: NextApiResponse) {
  try {
    const request = () =>
      NotificationService.updateNotification(
        req.query.id as string,
        req.body.new
      );
    await requestHandler(res, request, {
      success: "Notification updated ",
      error: "Error updating notification",
    });
  } catch (error) {
    return res.status(400).json({
      message: formatError(error),
    });
  }
}

async function deleteNotification(req: NextApiRequest, res: NextApiResponse) {
  try {
    const notificationId = req.query.id as string;

    await NotificationService.deleteNotification(notificationId);

    return res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: formatError(error),
    });
  }
}

const methods = {
  PUT: editNotification,
  // DELETE: deleteNotification,
};

export default apiHandler(methods);
