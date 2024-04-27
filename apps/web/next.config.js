/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  transpilePackages: ["@repo/ui", "@nextui-org/react", "@nextui-org/theme"],
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
