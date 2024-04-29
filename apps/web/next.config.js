/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  transpilePackages: ["@repo/ui"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
