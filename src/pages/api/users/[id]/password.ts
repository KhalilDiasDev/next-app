import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";
import requestHandler from "@/utils/requestHandler";
import QIAMService from "@/services/qiam";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

// async function updatePassword(req: NextApiRequest, res: NextApiResponse) {
//   const currentSession = await getServerSession(req, res, authOptions);
//   const session = await verifyUserAuthentication(currentSession);
//   const token = (session?.session.user as any)?.access_token;

//   if (!req.body.password) {
//     return res.status(400).json({ message: "Password can not be empty" });
//   }

//   const request = () =>
//     QIAMService.updatePassword(
//       req.query.id as string,
//       req.body.password,
//       token
//     );
//   await requestHandler(res, request, {
//     success: "User updated successfully",
//     error: "Error updating user",
//   });
// }

// const methods = {
//   PUT: updatePassword,
// };

// export default apiHandler(methods);
