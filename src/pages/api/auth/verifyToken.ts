import axios from "axios";
import formatError from "@/utils/format/formatError";

export const handleRefreshToken = async (refreshToken: string) => {
  const URLencoded = new URLSearchParams({
    client_id: process.env.NEXT_PRIVATE_QIAM_ID ?? "",
    client_secret: process.env.NEXT_PRIVATE_QIAM_SECRET ?? "",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    scope: "openid",
  });

  const response = await axios({
    url: `${process.env.NEXT_PRIVATE_QIAM_CLIENT_TOKEN_URL}/token`,
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
      `${process.env.NEXT_PRIVATE_QIAM_CLIENT_TOKEN_URL}/token/introspect`,
      new URLSearchParams({
        client_id: process.env.NEXT_PRIVATE_QIAM_ID ?? "",
        client_secret: process.env.NEXT_PRIVATE_QIAM_SECRET ?? "",
        token: token?.user?.access_token,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (response.data.active) {
      return { updated: false, token };
    } else {
      // refresh token
      const newToken = await handleRefreshToken(token?.user?.refresh_token);

      return { updated: true, token: newToken };
    }
  } catch (error) {
    throw new Error(`error verifying token: ${formatError(error)}`);
  }
}
