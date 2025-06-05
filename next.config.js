/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_NODE_HEIGHT: "40",
    NEXT_PUBLIC_NODE_GAP_Y: "60",
    NEXT_PUBLIC_NODE_GAP_X: "450",
  },
};

module.exports = nextConfig;
