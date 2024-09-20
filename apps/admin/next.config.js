/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  transpilePackages: ["@repo/ui", "@repo/tailwind-config"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
