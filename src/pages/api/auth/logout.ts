import { apiHandler } from "@/utils/apiHandler";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = `${
    process.env.NEXT_PRIVATE_QIAM_CLIENT_TOKEN_URL
  }/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL ?? ""
  )}&id_token_hint=${req.query.id_token}`;

  res.status(200).json({ path });
};
const methods = {
  POST: logout,
};

export default apiHandler(methods, false);
