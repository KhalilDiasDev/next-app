import axios from "axios";

export const handleRefreshToken = async (refreshToken: string) => {
  const URLencoded = new URLSearchParams({
    client_id: process.env.KEYCLOAK_ID ?? "",
    client_secret: process.env.KEYCLOAK_SECRET ?? "",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    scope: "openid",
  });

  const response = await axios({
    url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
    data: URLencoded,
    method: "POST",
  });

  return response.data;
};

export async function verifyAccessToken(
  token: any
): Promise<{ updated: boolean; token: any }> {
  try {
    const response = await axios.post(
      `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token/introspect`,
      new URLSearchParams({
        client_id: process.env.KEYCLOAK_ID ?? "",
        client_secret: process.env.KEYCLOAK_SECRET ?? "",
        token: token?.access_token,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response.data.active) {
      return { updated: false, token };
    } else {
      // refresh token
      const newToken = await handleRefreshToken(token?.refresh_token);

      return { updated: true, token: newToken };
    }
  } catch (error) {
    throw new Error(`error verifying token: ${(error)}`);
  }
}