import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "./apiHandler";
import axios from "axios";

const revokeToken = async (token: string, tokenType: 'access_token' | 'refresh_token') => {
  try {
    await axios.post(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/revoke`,
      new URLSearchParams({
        client_id: process.env.KEYCLOAK_ID ?? "",
        client_secret: process.env.KEYCLOAK_SECRET ?? "",
        token: token,
        token_type_hint: tokenType,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
  } catch (error) {
    console.error(`Error revoking ${tokenType}:`, (error));
  }
};

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id_token, access_token, refresh_token } = req.query;

    // Revoke tokens if provided
    if (access_token) {
      await revokeToken(access_token as string, 'access_token');
    }
    
    if (refresh_token) {
      await revokeToken(refresh_token as string, 'refresh_token');
    }

    // Build logout URL
    const logoutUrl = new URL(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`);
    logoutUrl.searchParams.set('post_logout_redirect_uri', process.env.NEXTAUTH_URL ?? "");
    
    if (id_token) {
      logoutUrl.searchParams.set('id_token_hint', id_token as string);
    }

    res.status(200).json({ path: logoutUrl.toString() });
  } catch (error) {
    console.error('Logout error:', (error));
    res.status(500).json({ error: 'Logout failed' });
  }
};

const methods = {
  POST: logout,
};

export default apiHandler(methods, false);