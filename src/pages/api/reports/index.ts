import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import { nextApi } from "@/services";

const url = "https://api.github.com/repos/qriar-labs/qap-canvas-support/issues";

async function createNotification(req: NextApiRequest, res: NextApiResponse) {
  const request = () =>
    nextApi.post(url, req.body, {
      headers: {
        Authorization: `token ${process.env.NEXT_PRIVATE_GITHUB_TOKEN}`,
      },
    });
  await requestHandler(res, request, {
    success: "Request sent successfully",
    error: "Error sending request",
  });
}

const methods = {
  POST: createNotification,
};

export default apiHandler(methods);
