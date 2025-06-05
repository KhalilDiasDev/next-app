import { authOptions } from "@/lib/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

// accepted methods for requests
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

    try {
      // Check if method is allowed
      if (!methods[method as ApiMethod]) {
        return res.status(405).json({
          error: "Method Not Allowed",
        });
      }

      // Check authentication only if route is private
      if (isPrivate) {
        const session = await getServerSession(req, res, authOptions);
        
        if (!session) {
          return res.status(401).json({
            error: "Unauthorized",
          });
        }
      }

      await methods[method as ApiMethod]!(req, res);
    } catch (error: any) {
      const status = error.statusCode || 500;
      res.status(status).json({
        error: (error),
      });
    }
  };
}