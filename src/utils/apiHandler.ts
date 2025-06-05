import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import formatError from "./format/formatError";

// accpected methos for requests
type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiMethods = {
  [key in ApiMethod]?: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>;
};

export function apiHandler(methods: ApiMethods, isPrivate = true) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const session = await getServerSession(req, res, authOptions);

    try {
      if (!session) {
        throw new Error("Unauthorized");
      }

      if (!methods[method as ApiMethod]) {
        throw new Error("Method Not Allowed");
      }

      await methods[method as ApiMethod]!(req, res);
    } catch (error: any) {
      const status =
        error.message === "Unauthorized" ? 401 : error.statusCode || 500;
      res.status(status).json({
        error: formatError(error),
      });
    }
  };
}
