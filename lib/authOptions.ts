// lib/authOptions.ts

import KeycloakProvider from "next-auth/providers/keycloak";
import type { NextAuthOptions } from "next-auth";
import { verifyAccessToken } from "@/app/api/auth/[...nextauth]/verifyToken";

export const authOptions: NextAuthOptions = {
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
      return !!(account && user);
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
        console.error(error);
        return { ...token, error: true };
      }
    },
    async session({ session, token }) {
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
