/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    KEYCLOAK_ID: process.env.KEYCLOAK_ID || '',
    KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET || '',
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER || '',
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
  },
};

module.exports = nextConfig;