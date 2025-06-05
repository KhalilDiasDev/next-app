import axios from "axios";

const getToken = async (auth?: GenericObject, url?: string) => {
  try {
    const response = await axios.post(
      url ? `${url}/oauth/token` : "/oatuh/token",
      {
        grant_type: "client_credentials",
        scope:
          "channels:read users:read users.profile:read dnd:read bookmarks:read reactions:read team:read emoji:read calls:read im:read groups:read chat:write",
      },
      {
        auth: {
          username: auth?.details.clientId,
          password: auth?.details.clientSecret,
        },
      }
    );

    const { access_token, expires_in } = response.data;
    const expirationTime = new Date().getTime() + expires_in * 1000;

    return { access_token, expirationTime };
  } catch (error) {
    console.error("Error fetching OAuth2 token:", error);
    throw error;
  }
};

/**
 * @name formatAuth
 * @description format the authentication to be passed as a header of a HTTP request.
 * @param auth The auth object to be formatted.
 * @param url the baseURL
 * @returns The formatted header. Returns undefined if auth is undefined.
 */
export async function formatAuth(
  auth?: GenericObject,
  url?: string
): Promise<{ token?: string; expirationTime?: number }> {
  if (!auth) return { token: undefined };

  switch (auth.type) {
    case "bearer":
      return { token: "Bearer " + auth.details.token };
    case "basic":
      return {
        token:
          "Basic " +
          Buffer.from(
            `${auth.details.username}:${auth.details.password}`
          ).toString("base64"),
      };
    case "oauth2":
      const { access_token, expirationTime } = await getToken(auth, url);
      return { token: "Bearer " + access_token, expirationTime };
    default:
      return { token: undefined };
  }
}
