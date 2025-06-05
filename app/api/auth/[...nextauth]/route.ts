import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { verifyAccessToken } from "./verifyToken";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? "",
      clientSecret: process.env.KEYCLOAK_SECRET ?? "",
      issuer: process.env.KEYCLOAK_ISSUER,
      idToken: true,

      profile(profile, tokens) {
        return {
          ...profile,
          id: profile.sub,
          id_token: tokens.id_token,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          isAdmin: profile.groups?.includes("/admin"),
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account && user) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.user = user;
        return token;
      }

      try {
        const updatedToken = await verifyAccessToken(token);

        if (updatedToken.updated) {
          const newToken = updatedToken.token;

          return {
            ...token,
            ...newToken,
            user: {
              ...(token.user as any),
              ...newToken,
            },
          };
        }

        return token;
      } catch (error: any) {
        console.error((error));
        return { ...token, error: true };
      }
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };