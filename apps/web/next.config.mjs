/** @type {import('next').NextConfig} */

export default {
  transpilePackages: ["@repo/ui", "@repo/tailwind-config"],
  eslint: {
    ignoreDuringBuilds: true,
  }
};
